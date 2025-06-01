pipeline {
  agent any

  tools {
    nodejs 'Node24'
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Install Backend Dependencies') {
      steps {
        echo '📦 Installing backend dependencies...'
        dir('server') {
          sh 'npm install'
        }
      }
    }

    stage('Run Backend Tests') {
      steps {
        echo '🧪 Running backend tests...'
        dir('server') {
          sh 'NODE_ENV=test npm test'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        echo '📦 Installing frontend dependencies...'
        dir('client') {
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        echo '🔧 Building frontend...'
        dir('client') {
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
