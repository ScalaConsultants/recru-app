pipeline {
  agent {
    label 'recruapp'
  }

  options { 
    skipDefaultCheckout()
    disableConcurrentBuilds()
  }

  environment {
    PROD_BACKEND_URL = "recru-app-backend.scalac.io"
    DEVEL_BACKEND_URL = "recru-app-devel-backend.scalac.io"
    PROD_S3_BUCKET = "new.scalac.io"
    DEVEL_S3_BUCKET = "devel-new.scalac.io"
    PROD_CLOUDFRONT_ID = "E39OM94WC3J4I3"
    DEVEL_CLOUDFRONT_ID = "E3CQDMNIMIRHIN"
  }

  stages {
    stage('first stage') {
      steps {
        checkout scm   
      }
    }

    stage('build') {
      agent {
        docker {
          image 'node:7.10'
          reuseNode true
          args "-v \$PWD:/src" 
        }
      }
      environment {
        npm_config_cache = "npm-cache"
        HOME = "."
      }
      steps {
        sh 'npm install'
        sh 'node_modules/.bin/gulp build -p'
        sh 'mv build/app-*.css build/app.css'
        sh 'mv build/app-*.js build/app.js'
        sh 'sed -i "s#../../../assets#./assets#g" build/app.js'
        sh 'chmod -R 777 build'
      }
    }


    stage('deploy-devel') {
      when {
       anyOf {
          branch 'devel'
          branch 'jenkinsfile'
        }
      }
      agent {
        docker {
          image 'garland/aws-cli-docker:latest'
          reuseNode true
        }
      }
      environment {
        HOME = "."
      }
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'AWS-scalac-admin', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
            sh 'set -xeuo pipefail'
            sh 'sed -i "s#${PROD_BACKEND_URL}#${DEVEL_BACKEND_URL}#g" build/app.js'
            sh 'export EPOCH=$(date +%s)'
            sh 'aws s3 cp s3://${DEVEL_S3_BUCKET}/join_us s3://${DEVEL_S3_BUCKET}/join_us_${EPOCH} --recursive'
            // retain last 5 backups
            sh 'aws s3 ls s3://${DEVEL_S3_BUCKET}/ | egrep -o "join_us_[[:digit:]]+" | egrep -o "[[:digit:]]+$" | sort -r |  tail -n +5 | xargs -n 1 -I {} aws s3 rm s3://${DEVEL_S3_BUCKET}/join_us_{} --recursive'
            sh 'aws s3 rm s3://${DEVEL_S3_BUCKET}/join_us/ --recursive'
            sh 'aws s3 cp assets s3://${DEVEL_S3_BUCKET}/join_us/assets --recursive'
            sh 'aws s3 cp build/ s3://${DEVEL_S3_BUCKET}/join_us/ --recursive'
            sh 'aws s3 cp index.html s3://${DEVEL_S3_BUCKET}/join_us/'
            sh 'aws configure set preview.cloudfront true'
            sh 'aws cloudfront create-invalidation --distribution-id $DEVEL_CLOUDFRONT_ID --paths "/*"'
          }
        }
      }
    }

    stage('deploy-production') {
      when {
        branch 'master'
      }
      agent {
        docker {
          image 'garland/aws-cli-docker:latest'
          reuseNode true
        }
      }
      environment {
        HOME = "."
      }
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'AWS-scalac-admin', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
            sh 'set -xeuo pipefail'
            sh 'export EPOCH=$(date +%s)'
            sh 'aws s3 cp s3://${PROD_S3_BUCKET}/join_us s3://${PROD_S3_BUCKET}/join_us_${EPOCH} --recursive'
            // retain last 5 backups
            sh 'aws s3 ls s3://${PROD_S3_BUCKET}/ | egrep -o "join_us_[[:digit:]]+" | egrep -o "[[:digit:]]+$" | sort -r |  tail -n +5 | xargs -n 1 -I {} aws s3 rm s3://${PROD_S3_BUCKET}/join_us_{} --recursive'
            sh 'aws s3 rm s3://${PROD_S3_BUCKET}/join_us/ --recursive'
            sh 'aws s3 cp assets s3://${PROD_S3_BUCKET}/join_us/assets --recursive'
            sh 'aws s3 cp build/ s3://${PROD_S3_BUCKET}/join_us/ --recursive'
            sh 'aws s3 cp index.html s3://${PROD_S3_BUCKET}/join_us/'
            sh 'aws configure set preview.cloudfront true'
            sh 'aws cloudfront create-invalidation --distribution-id $PROD_CLOUDFRONT_ID --paths "/*"'
          }
        }
      }
    }
  }
}
