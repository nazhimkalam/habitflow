pipeline {
  agent any

  tools {
    nodejs 'Node24'
  }

  environment {
    CI = 'true'
    NODE_ENV = 'test'
    MONGO_URI = 'mongodb+srv://nktechdata:WLAvke76jEAmogW8@habitflow.3cuv1kj.mongodb.net/habitflow?retryWrites=true&w=majority'
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
          sh 'npm test'
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
