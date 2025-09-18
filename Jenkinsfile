pipeline {
    agent {
        node {
            label 'jenkins-agent'
        }
    }

    environment {
        APP_ENV = "development"
    }

    stages {
        stage ('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Rullabcde/learn-jenkins.git'
            }
        }
        stage ('Check Env') {
            steps {
                echo "Environment is ${APP_ENV}"
            }
        }
        stage ('Use Secret') {
            steps {
                withCredentials([string(credentialsId: 'user', variable: 'USER')]) {
                    echo "My secret text is $USER"
                }
            }
        }
        stage ('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage ('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage ('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}