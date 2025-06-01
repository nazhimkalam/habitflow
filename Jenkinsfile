pipeline {
  agent any

  environment {
    CI = 'true'
  }

  stages {
    stage('Install Backend Dependencies') {
      steps {
        echo '📦 Installing backend dependencies...'
        sh 'docker run --rm -v $PWD/server:/app -w /app node:18-alpine sh -c "npm install"'
      }
    }

    stage('Run Backend Tests') {
      steps {
        echo '🧪 Running backend tests...'
        sh 'docker run --rm -v $PWD/server:/app -w /app node:18-alpine sh -c "npm test"'
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        echo '📦 Installing frontend dependencies...'
        sh 'docker run --rm -v $PWD/client:/app -w /app node:18-alpine sh -c "npm install"'
      }
    }

    stage('Build Frontend') {
      steps {
        echo '🔧 Building frontend...'
        sh 'docker run --rm -v $PWD/client:/app -w /app node:18-alpine sh -c "npm run build"'
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
