pipeline {
    agent {
        docker {
            image 'docker:24.0-cli'
            args '-v /var/run/docker.sock:/var/run/docker.sock --privileged'
        }
    }

    environment {
        NODE_VERSION = '20.15.0'
        DOCKER_IMAGE_NAME = 'gi-elearning-frontend'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/aymenlamkhanet/GI_elearning.git'
            }
        }

        stage('Setup Node') {
            steps {
                sh 'apk add --no-cache nodejs npm'
                sh 'npm install -g npm@latest'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}", "-f frontend/Dockerfile .")
                }
            }
        }
    }

    post {
        always {
            deleteDir() // Use this instead of cleanWs
        }
    }
}