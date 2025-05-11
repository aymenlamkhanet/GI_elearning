pipeline {
    agent any
    
    environment {
        NODE_VERSION = 'v23.7.0'
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
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

        stage('Debug Network') {
            steps {
                sh 'docker ps'
                sh 'docker network ls'
                sh 'docker network inspect bridge'
            }
        }

        stage('Test SonarQube Connection') {
            steps {
                sh 'curl -v http://172.17.0.2:9000/api/system/status'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(
                    installationName: 'Sonarqube', 
                    credentialsId: 'sonar_token'
                ) {
                    sh '''
                        sonar-scanner -X \
                        -Dsonar.host.url=http://172.17.0.2:9000 \
                        -Dsonar.projectKey=SonarQube_GI \
                        -Dsonar.projectName='SonarQube_GI' \
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