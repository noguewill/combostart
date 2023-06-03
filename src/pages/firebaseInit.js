// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq76U-b01KaJf774XBr8uaQAsDcwsmim0",
  authDomain: "combostart-2130c.firebaseapp.com",
  projectId: "combostart-2130c",
  storageBucket: "combostart-2130c.appspot.com",
  messagingSenderId: "1067773348824",
  appId: "1:1067773348824:web:cdc0229678f0d2d48540ad",
  measurementId: "G-LJPK36DVN5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
