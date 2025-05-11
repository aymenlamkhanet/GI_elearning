pipeline {
    agent any
    environment {
        NODE_VERSION = 'v23.7.0'  // Optional, but ensure it's consistent if used elsewhere
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
    }
    tools {
        nodejs 'NodeJS 23.7.0'
    }
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                git branch: 'main', url: 'https://github.com/aymenlamkhanet/GI_elearning.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies......'
                sh 'npm --version'
                sh 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Sonarqube') { // Must match EXACTLY your server name
                    // Install and use sonar-scanner directly without tool dependency
                    sh '''
                    npm install -g sonar-scanner
                    sonar-scanner \\
                    -Dsonar.projectKey=SonarQube_TP1 \\
                    -Dsonar.projectName='SonarQube_TP1' \\
                    -Dsonar.host.url=http://172.17.0.2:9000 \\
                    -Dsonar.sources=src \\
                    -Dsonar.language=js \\
                    -Dsonar.sourceEncoding=UTF-8
                    '''
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker:latest'
                    args '-e DOCKER_HOST=tcp://host.docker.internal:2375'  // Use TCP instead of socket
                }
            }
            environment {
                DOCKER_CONFIG = "$HOME/.docker"  // Still needed for config files
            }
            steps {
                echo 'Building Docker Image...'
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
    }
    
    post {
        success {
            node(null) {  // Ensure we're in a node context for cleanWs
                echo 'Pipeline succeeded! 🎉'
            }
        }
        failure {
            node(null) {  // Ensure we're in a node context for cleanWs
                echo 'Pipeline failed! ❌'
            }
        }
        always {
            node(null) {  // Ensure we're in a node context for cleanWs
                echo 'Cleaning up workspace...'
                cleanWs()
            }
        }
    }
}