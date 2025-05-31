pipeline {
  agent any

  environment {
    // Set environment variables if needed (e.g., NODE_ENV)
    NODE_ENV = 'development'
  }

  stages {
    stage('Checkout') {
      steps {
        echo '📥 Cloning the repository...'
        checkout scm
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir('server') {
          echo '📦 Installing backend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Run Backend Tests') {
      steps {
        dir('server') {
          echo '🧪 Running backend tests...'
          sh 'npm test'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir('client') {
          echo '📦 Installing frontend dependencies...'
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir('client') {
          echo '🔧 Building React app...'
          sh 'npm run build'
        }
      }
    }

    stage('Post-Build Success') {
      steps {
        echo '✅ All steps completed successfully!'
      }
    }
  }

  post {
    failure {
      echo '❌ Build failed. Please check the console output above.'
    }
  }
}
