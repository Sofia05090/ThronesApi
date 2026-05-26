import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBmqTXgsly3388W1VSqm0gvBlHp78NBq2c",
    authDomain: "thronesapi-10553.firebaseapp.com",
    projectId: "thronesapi-10553",
    storageBucket: "thronesapi-10553.firebasestorage.app",
    messagingSenderId: "208775331395",
    appId: "1:208775331395:web:7c2ed69f3cc677bec71ef6"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)