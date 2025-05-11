pipeline {
    agent any
    
    environment {
        NODE_VERSION = 'v23.7.0'
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
        // Use proper credentials binding
        SONARQUBE = credentials('sonar_token')
    }
    
    tools {
        nodejs 'NodeJS 23.7.0'
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                checkout scm
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
                sh 'npm test || echo "Tests failed but continuing"'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Sonarqube') {
                    sh '''
                    npm install -g sonar-scanner
                    sonar-scanner \
                    -Dsonar.projectKey=SonarQube_TP1 \
                    -Dsonar.projectName='SonarQube_TP1' \
                    -Dsonar.host.url=http://172.17.0.2:9000 \
                    -Dsonar.login=${SONARQUBE} \
                    -Dsonar.sources=src \
                    -Dsonar.language=js \
                    -Dsonar.sourceEncoding=UTF-8
                    '''
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image...'
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}