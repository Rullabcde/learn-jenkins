def runTests(version) {
    sh "echo ${version}"
}

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
        DEPLOY_KEY = credentials('user')
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
            }
        }
        stage('Test') {
            parallel {
                stage('Node 16') {
                    steps {
                        script {
                            runTests('16')
                        }
                    }
                }
                stage('Node 18') {
                    steps {
                        script {
                            runTests('18')
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
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
        changed {
            echo "Pipeline changed"
        }
        unstable {
            echo "Unstable"
        }
    }
}
