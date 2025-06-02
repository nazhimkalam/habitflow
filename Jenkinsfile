pipeline {
  agent any

  tools {
    nodejs 'Node24'
  }

  environment {
    CI = 'true'
    NODE_ENV = 'test'
    MONGO_URI = 'mongodb+srv://nktechdata:WLAvke76jEAmogW8@habitflow.3cuv1kj.mongodb.net/habitflow?retryWrites=true&w=majority'

    BACKEND_IMAGE = 'habitflow-backend'
    FRONTEND_IMAGE = 'habitflow-frontend'

    BACKEND_TAR = 'habitflow-backend.tar'
    FRONTEND_TAR = 'habitflow-frontend.tar'
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

    stage('Build Docker Images') {
      steps {
        echo '🐳 Building Docker images...'
        dir('server') {
          sh 'docker build -t $BACKEND_IMAGE .'
        }
        dir('client') {
          sh 'docker build -t $FRONTEND_IMAGE .'
        }
      }
    }

    stage('Save Docker Images') {
      steps {
        echo '💾 Saving Docker images as .tar files...'
        sh 'docker save -o $BACKEND_TAR $BACKEND_IMAGE'
        sh 'docker save -o $FRONTEND_TAR $FRONTEND_IMAGE'
      }
    }

    stage('Archive Docker Artefacts') {
      steps {
        echo '📁 Archiving Docker image files...'
        archiveArtifacts artifacts: '*.tar', fingerprint: true
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
