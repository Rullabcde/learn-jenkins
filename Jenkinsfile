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
        stage ('Setup Node.js') {
            steps {
                echo "Setting up Node.js"
                sh 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
                \. "$HOME/.nvm/nvm.sh"
                nvm install 22
                npm install -g npm'
                sh 'node -v'
                sh 'npm -v'
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
        unstable {
            echo "Unstable"
        }
    }
}
