pipeline {
    agent {
        node {
            label 'jenkins-agent'
        }
    }

    triggers {
        githubPush()
    }

    environment {
        DEPLOY_KEY = credentials('deploy')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Rullabcde/learn-jenkins.git'
            }
        }
        stage('Install') {
            steps {
                echo "Installing dependencies"
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo "Building the project"
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                echo "Running tests"
                sh 'npm test'
            }  
        }
        stage('Deploy') {
            steps {
                echo "Deploying to production server"
                sh 'echo $DEPLOY_KEY'
            }
        }
    }
    post {
        success {
            echo "Success"
        }
        failure {
            echo "Failed"
        }
        changed {
            echo "Pipeline changed"
        }
        unstable {
            echo "Unstable"
        }
    }
}
