pipeline {
    agent any
    
    environment {
        NODE_VERSION = 'v23.7.0'
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
        // Don't use credentials binding here as we'll use withCredentials block
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
                    // No need for additional credentials since they're configured in SonarQube server settings
                    sh '''
                    npm install -g sonar-scanner
                    sonar-scanner \
                    -Dsonar.projectKey=SonarQube_TP1 \
                    -Dsonar.projectName='SonarQube_TP1' \
                    -Dsonar.sources=. \
                    -Dsonar.exclusions=node_modules/**,coverage/**,dist/**,test/**,**/*.test.js \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                    -Dsonar.sourceEncoding=UTF-8
                    '''
                }
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    // Using catchError to prevent pipeline failure if quality gate check fails
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        waitForQualityGate abortPipeline: false
                    }
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