pipeline {
    agent {
        docker {
            image 'docker:24.0-dind'
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
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
        REGISTRY = 'docker.io'
        IMAGE_NAME = 'docker.io/rullabcd/app'
        IMAGE_TAG = 'latest'
        DEPLOY_KEY = credentials('deploy-key')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Rullabcde/learn-jenkins.git'
            }
        }
        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                    sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                }
            }
        }
        stage('Check Image Exists') {
            steps {
                script {
                    def exists = sh(
                        script: "docker pull $IMAGE_NAME:$IMAGE_TAG >/dev/null 2>&1 && echo true || echo false",
                        returnStdout: true
                    ).trim()
                    if (exists == "true") {
                        echo "Image already exists in registry. Skipping build & push."
                        currentBuild.description = "Skipped build & push"
                        skipStages = true
                    }
                }
            }
        }
        stage ('Build Docker Image') {
            when { expression { return !binding.hasVariable('skipStages') } }
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
            }
        }
        stage('Push Docker Image') {
            when { expression { return !binding.hasVariable('skipStages') } }
            steps {
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
            }
        }
        stage('Deploy to Production') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'deploy-key', keyFileVariable: 'SSH_KEY')]) {
                sh '''
                    ssh -o StrictHostKeyChecking=no -i $SSH_KEY ubuntu@ec2-3-235-232-5.compute-1.amazonaws.com \
                    "docker pull $IMAGE_NAME:$IMAGE_TAG && \
                    docker rm -f myapp || true && \
                    docker run -d -p 80:3000 --name myapp --restart always $IMAGE_NAME:$IMAGE_TAG"
                '''
                }
            }
        }
    }
    post {
        always {
            sh 'docker logout $REGISTRY || true'
        }
        success {
            slackSend(channel: '#jenkins', color: 'good', message: "Deployment succeeded for ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
        failure {
            slackSend(channel: '#jenkins', color: 'danger', message: "Deployment failed for ${env.JOB_NAME} #${env.BUILD_NUMBER}")
        }
    }
}
