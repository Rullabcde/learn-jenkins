pipeline {
    agent none
    options {
        buildDiscarder(logRotator(
            daysToKeepStr: '3',
            numToKeepStr: '5',
            artifactDaysToKeepStr: '3',
            artifactNumToKeepStr: '5'
        ))
    }

    triggers {
        githubPush()
    }

    environment {
        DEPLOY_KEY = credentials('deploy')
    }

    stages {
        stage('Checkout') {
            agent {
                node {
                    label 'jenkins-agent'
                }
            }
            steps {
                git branch: 'main', url: 'https://github.com/Rullabcde/learn-jenkins.git'
            }
        }
        stage('Install & Build') {
            agent {
                docker { image 'node:20' }
            }
            steps {
                echo "Installing dependencies and building the project"
                sh 'npm install'
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
        stage('Cleanup') {
            agent {
                node {
                    label 'jenkins-agent'
                }
            }
            steps {
                echo "Cleaning up workspace"
                deleteDir()
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
