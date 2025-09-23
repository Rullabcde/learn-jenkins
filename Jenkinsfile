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
        stage('Install') {
            agent {
                docker { image 'node:20' }
            }
            steps {
                echo "Installing dependencies"
                sh 'npm ci'
            }
        }
        stage ('Test & Coverage') {
            agent {
                docker { image 'node:20' }
            }
            steps {
                echo "Running tests"
                sh 'npm run test:coverage'
                junit 'report.xml'
            }
        }
        stage('Build') {
            agent {
                docker { image 'node:20' }
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
            slackSend(channel: '#jenkins', color: 'good', message: "Deployment succeeded for ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            slackSend(channel: '#jenkins', color: 'danger', message: "Deployment failed for ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}
