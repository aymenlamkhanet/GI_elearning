pipeline {
    agent any
    environment {
        NODE_VERSION = '20.15.0'
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
    }
    tools {
        nodejs 'NodeJs20.15.0' 
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
        
        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker:24.0-dind'  // Official Docker-in-Docker image
                    args '--privileged'        // Required for DinD
                }
            }
            environment {
                DOCKER_TLS_CERTDIR = ""  // Disable TLS for simplicity
                DOCKER_HOST = "tcp://docker:2375"  // Connect to the DinD service
            }
            steps {
                sh 'docker version'  // Verify Docker is available
                sh "docker build -t ${DOCKER_IMAGE} ."  // Build the image
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
