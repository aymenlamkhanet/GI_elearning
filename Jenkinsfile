pipeline {
    agent any
    environment {
        NODE_VERSION = 'v23.7.0'  // Optional, but ensure it's consistent if used elsewhere
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
    }
    tools {
        nodejs 'NodeJS 23.7.0' // Corrected tool name to match Jenkins configuration
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
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            environment {
                DOCKER_HOST = 'tcp://host.docker.internal:2375'
            }
            steps {
                echo 'Build Docker Image ......'
                sh 'docker version'
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
