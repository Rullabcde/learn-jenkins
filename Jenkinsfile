pipeline {
    agent none

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
            agent {
                docker {
                    image 'node:20'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                echo "Installing dependencies"
                sh 'npm install'
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:20'
                    args '-v /var/run/docker.sock:/var/run/docker.sock'
                }
            }
            steps {
                echo "Building the project"
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            agent {
                node {
                    label 'jenkins-agent'
                }
            }
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
        unstable {
            echo "Unstable"
        }
    }
}
