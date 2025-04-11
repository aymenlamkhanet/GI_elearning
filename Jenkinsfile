pipeline {
    agent any

    environment {
        NODE_VERSION = '20.15.0'              // Node.js version
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}" // Docker image name with unique build ID
        DOCKER_HOST = 'tcp://docker:2376'
    }

    tools {
        nodejs 'NodeJs20.15.0' 
    }

    stages {
        // Stage 1: Clone Repository
        stage('Clone Repository') {
            steps {
                script {
                    echo 'Cloning the repository...'
                    git branch: 'main', url: 'https://github.com/aymenlamkhanet/GI_elearning.git'
                }
            }
        }

        // Stage 2: Install Dependencies
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm --version'
                    sh 'npm install'
                }
            }
        }

        // Stage 3: Run Tests
        stage('Run Tests') {
            steps {
                script {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
        }

        // Stage 4: Build Docker Image
        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker:24.0-dind'  # Official dind image
                    args '''
                        -v /var/run/docker.sock:/var/run/docker.sock
                        --privileged
                        --group-add $(stat -c %g /var/run/docker.sock)
                    '''
                }
            }
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}")
                }
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
