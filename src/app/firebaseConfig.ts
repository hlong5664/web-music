import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC83WtCXlF1RDp39bJpY73UmIYCS6xt5sI",
    authDomain: "project5-52f06.firebaseapp.com",
    databaseURL: "https://project5-52f06-default-rtdb.firebaseio.com",
    projectId: "project5-52f06",
    storageBucket: "project5-52f06.firebasestorage.app",
    messagingSenderId: "911551267554",
    appId: "1:911551267554:web:56bf5ff4c8d327605a94bb",
};

const app = initializeApp(firebaseConfig);
export const dbFirebase = getDatabase(app);
export const authFirebase = getAuth(app);
