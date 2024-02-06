import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUkcrvxWu4FR7gVJysi0dTONGsFLwJ9po",
    authDomain: "ecommerce-portfolio-react.firebaseapp.com",
    projectId: "ecommerce-portfolio-react",
    storageBucket: "ecommerce-portfolio-react.appspot.com",
    messagingSenderId: "67583490133",
    appId: "1:67583490133:web:d714b27c19841a76c2bcdc",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
