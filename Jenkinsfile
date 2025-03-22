pipeline {
    agent any

    environment {
        NODE_VERSION = '20.15.0'
        DOCKER_IMAGE_NAME = 'gi-elearning-frontend'
    }

    tools {
        nodejs 'NodeJs20.15.0'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo 'Cloning the repository...'
                    git branch: 'main', url: 'https://github.com/aymenlamkhanet/GI_elearning.git'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm --version'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    docker.build("${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}", "-f frontend/Dockerfile .")
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}


