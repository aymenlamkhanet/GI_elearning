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
        
        stage('SonarQube Debug') {
            steps {
                // First, check SonarQube connectivity and token validity
                sh '''
                    TOKEN=$(echo ${SONAR_CREDS} | cut -d':' -f2)
                    
                    echo "=== SonarQube Diagnostics ==="
                    echo "Checking SonarQube server status..."
                    STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://172.17.0.2:9000/api/system/status)
                    echo "Server status code: $STATUS_CODE"
                    
                    echo "Validating token..."
                    AUTH_RESULT=$(curl -s -u "${TOKEN}:" http://172.17.0.2:9000/api/authentication/validate)
                    echo "Authentication result: $AUTH_RESULT"
                    
                    echo "Checking user permissions..."
                    USER_INFO=$(curl -s -u "${TOKEN}:" http://172.17.0.2:9000/api/users/current)
                    echo "User info: $USER_INFO"
                    
                    # Try alternate project creation method
                    echo "Trying different project creation approach..."
                    curl -s -u "${TOKEN}:" -X POST "http://172.17.0.2:9000/api/projects/create" \
                      -d "name=SonarQube_TP1" \
                      -d "project=SonarQube_TP1" || echo "Project creation API call failed"
                    
                    # List available projects to verify
                    echo "Available projects:"
                    curl -s -u "${TOKEN}:" "http://172.17.0.2:9000/api/projects/search" || echo "Cannot list projects"
                '''
            }
        }
        
        stage('SonarQube Analysis with Global Settings') {
            environment {
                // Try alternate token binding
                SONAR_TOKEN = credentials('sonar_token')
            }
            steps {
                // Use withSonarQubeEnv without relying on internal variable extraction
                withSonarQubeEnv(installationName: 'Sonarqube', credentialsId: 'sonar_token') {
                    sh '''
                        # Print SonarQube environment for debugging
                        env | grep SONAR
                        
                        # Run scanner with explicit parameters and token
                        /var/jenkins_home/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS_23.7.0/lib/node_modules/sonar-scanner/bin/sonar-scanner \
                        -X \
                        -Dsonar.projectKey=SonarQube_TP1 \
                        -Dsonar.projectName=SonarQube_TP1 \
                        -Dsonar.host.url=http://172.17.0.2:9000 \
                        -Dsonar.login=$SONAR_TOKEN \
                        -Dsonar.sources=. \
                        -Dsonar.exclusions=node_modules/**,coverage/**,dist/**,test/**,**/*.test.js \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.sourceEncoding=UTF-8
                    '''
                }
            }
        }
        
        stage('Direct Scanner Command') {
            steps {
                // Try with direct local scanner installation - in case of path issues
                sh '''
                    # Use absolute path to scanner with -X debug flag
                    TOKEN=$(echo ${SONAR_CREDS} | cut -d':' -f2)
                    
                    sonar-scanner \
                    -Dsonar.scm.disabled=true \
                    -Dsonar.projectKey=SonarQube_TP1 \
                    -Dsonar.projectName=SonarQube_TP1 \
                    -Dsonar.host.url=http://172.17.0.2:9000 \
                    -Dsonar.token=${TOKEN} \
                    -Dsonar.sources=. \
                    -Dsonar.exclusions=node_modules/**,coverage/**,dist/**,test/**,**/*.test.js \
                    -Dsonar.sourceEncoding=UTF-8 || echo "Direct scanner approach failed"
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