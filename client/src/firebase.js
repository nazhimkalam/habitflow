import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjyhX41G8BDd1bVfG-21jxJzc3iE57mYQ",
  authDomain: "habitflow-naz.firebaseapp.com",
  projectId: "habitflow-naz",
  storageBucket: "habitflow-naz.firebasestorage.app",
  messagingSenderId: "469639152237",
  appId: "1:469639152237:web:7c6ddfd6e21a992c5cf564",
  measurementId: "G-1GMJJ0G22L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
