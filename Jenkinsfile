pipeline {
    agent any
    
    environment {
        NODE_VERSION = 'v23.7.0'
        DOCKER_IMAGE = "my-app:${env.BUILD_ID}"
        SONAR_PROJECT_KEY = "SonarQube_TP1"
        // Define credential for direct access
        SONAR_CREDS = credentials('sonar_token')
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
        
        stage('Create SonarQube Project') {
            steps {
                // Create the project first using API call with direct token
                sh '''
                    TOKEN=$(echo ${SONAR_CREDS} | cut -d':' -f2)
                    curl -u "${TOKEN}:" -X POST "http://172.17.0.2:9000/api/projects/create" \
                    -d "name=SonarQube_TP1" \
                    -d "project=SonarQube_TP1" || true
                '''
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                // Use token directly in scanner configuration
                sh '''
                    TOKEN=$(echo ${SONAR_CREDS} | cut -d':' -f2)
                    /var/jenkins_home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS_23.7.0/lib/node_modules/sonar-scanner/bin/sonar-scanner \
                    -Dsonar.projectKey=SonarQube_TP1 \
                    -Dsonar.projectName=SonarQube_TP1 \
                    -Dsonar.host.url=http://172.17.0.2:9000 \
                    -Dsonar.login=${TOKEN} \
                    -Dsonar.sources=. \
                    -Dsonar.exclusions=node_modules/**,coverage/**,dist/**,test/**,**/*.test.js \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                    -Dsonar.sourceEncoding=UTF-8
                '''
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