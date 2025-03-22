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
                script {
                    echo 'Cloning the repository...'
                    git branch: 'main', url: 'https://github.com/aymenlamkhanet/GI_elearning.git'
                }
            }
        }

        stage('Prepare Environment') {
            steps {
                script {
                    echo 'Setting up Node.js environment...'
                    sh '''
                        apk add --no-cache curl bash
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && \\. "$NVM_DIR/nvm.sh"
                        nvm install ${NODE_VERSION}
                        npm install -g npm@latest
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh '''
                        node --version
                        npm --version
                        npm install
                    '''
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
                    sh """
                        docker build -t ${DOCKER_IMAGE_NAME}:${BUILD_NUMBER} -f frontend/Dockerfile .
                        docker images | grep ${DOCKER_IMAGE_NAME}
                    """
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
            sh 'docker system prune -f'
        }
    }
}