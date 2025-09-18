pipeline {
    agent {
        labels 'jenkins-agent'
    }

    stages {
        stage ('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Rullabcde/learn-jenkins.git'
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