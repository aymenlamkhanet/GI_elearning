pipeline {
    agent any
    environment {
        NODE_VERSION = 'v23.7.0'
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
    }
    tools {
        nodejs 'NodeJS 23.7.0'
        sonarRunner 'SonarQubeScanner'
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
                echo 'Installing dependencies...'
                sh 'npm --version'
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Sonarqube') { // Must match EXACTLY your server name
                    sh """
                    ${tool('SonarQubeScanner')}/bin/sonar-scanner \
                    -Dsonar.projectKey=SonarQube_TP1 \
                    -Dsonar.projectName='SonarQube_TP1' \
                    -Dsonar.host.url=http://172.17.0.2:9000 \
                    -Dsonar.login=${sonartoken} \ // Use credential ID from Jenkins
                    -Dsonar.sources=src \
                    -Dsonar.language=js \
                    -Dsonar.sourceEncoding=UTF-8
                    """
                }
            }
        }
        
        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker:latest'
                    args '-e DOCKER_HOST=tcp://host.docker.internal:2375'
                }
            }
            environment {
                DOCKER_CONFIG = "$HOME/.docker"
            }
            steps {
                echo 'Building Docker Image...'
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded! 🎉'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}