pipeline {
    agent any

    environment {
        // Define environment variables if needed
        NODE_VERSION = '16' // Specify the Node.js version
    }

    tools {
        nodejs 'NodeJS-16' // Use the NodeJS plugin with the installation name configured in Jenkins
    }

    stages {
        // Stage 1: Clone the repository
        stage('Clone Repository') {
            steps {
                script {
                    echo 'Cloning the repository...'
                    git branch: 'main', url: 'https://github.com/aymenlamkhanet/GI_elearning.git'
                }
            }
        }

        // Stage 2: Install dependencies
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        // Stage 3: Run tests
        stage('Run Tests') {
            steps {
                script {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
        }
    }

    post {
        // Post-build actions
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs() // Clean the workspace after the build
        }
    }
}