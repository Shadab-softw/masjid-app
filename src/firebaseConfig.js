// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaSxhwmUfvJOOO54yb9AyfaZdOPSXfDpo",
  authDomain: "masjidapp-e94a1.firebaseapp.com",
  projectId: "masjidapp-e94a1",
  storageBucket: "masjidapp-e94a1.appspot.com",
  messagingSenderId: "530539756345",
  appId: "1:530539756345:web:8f1e29ecb8c467885dc6e8",
  measurementId: "G-EJWMHLYJC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);