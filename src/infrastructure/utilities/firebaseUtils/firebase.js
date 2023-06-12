import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { Alert } from "react-native";

const firebaseConfig = {
    apiKey: "AIzaSyDQKfwy9xIVoZK6-iqH9LCCdx4gB1VycKk",
    authDomain: "pomodoro-9344b.firebaseapp.com",
    projectId: "pomodoro-9344b",
    storageBucket: "pomodoro-9344b.appspot.com",
    messagingSenderId: "810079015331",
    appId: "1:810079015331:web:8578aa5588cb382bb6ca16"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
