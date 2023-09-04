import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCTswyx9w5H5aSRoK2Gypjbi9xYMJfMNnk",
    authDomain: "weather-api-a6fdf.firebaseapp.com",
    projectId: "weather-api-a6fdf",
    storageBucket: "weather-api-a6fdf.appspot.com",
    messagingSenderId: "219428746272",
    appId: "1:219428746272:web:cd3015d121bb029325f845",
    measurementId: "G-8HQ52LFFC2"
};


//auhorize connection between firebase and appliction
const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app);