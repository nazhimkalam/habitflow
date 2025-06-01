pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Install Backend Dependencies') {
      agent {
        docker {
          image 'node:18-alpine'
        }
      }
      steps {
        dir('server') {
          echo '📦 Installing backend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Run Backend Tests') {
      agent {
        docker {
          image 'node:18-alpine'
        }
      }
      steps {
        dir('server') {
          echo '🧪 Running backend tests...'
          sh 'npm test'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      agent {
        docker {
          image 'node:18-alpine'
        }
      }
      steps {
        dir('client') {
          echo '📦 Installing frontend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      agent {
        docker {
          image 'node:18-alpine'
        }
      }
      steps {
        dir('client') {
          echo '🔧 Building frontend...'
          sh 'npm run build'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Build successful!'
    }
    failure {
      echo '❌ Build failed. Please check the console output above.'
    }
  }
}
