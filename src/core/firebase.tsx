import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDG_sf2bnRZdcxBOumpTcN1OT9aADfoMoY",
    authDomain: "discount-646d6.firebaseapp.com",
    projectId: "discount-646d6",
    storageBucket: "discount-646d6.appspot.com",
    messagingSenderId: "961694167011",
    appId: "1:961694167011:web:4821329e3f6a9209103ad6",
    measurementId: "G-7RWEG0QETC"
};

export const app = initializeApp( firebaseConfig )
export const auth = getAuth( app )
export const db = getFirestore( app )