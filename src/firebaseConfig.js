import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Firebase config
const firebaseConfig = {
  // apiKey: "AIzaSyAEweNpjVNghgB-OlKcw2MCjPWB6IGral0",
  // authDomain: "doan1-496a6.firebaseapp.com",
  // projectId: "doan1-496a6",
  // storageBucket: "doan1-496a6.firebasestorage.app",
  // messagingSenderId: "556876760925",
  // appId: "1:556876760925:web:37919285a671a73bc8cab4",
  // measurementId: "G-CXYZ8MYKK0"

  apiKey: "AIzaSyAwQ_WmDzZyv7TwgDIkyF1SQvSG3Pu0DBQ",
  authDomain: "doan1-78276.firebaseapp.com",
  projectId: "doan1-78276",
  storageBucket: "doan1-78276.firebasestorage.app",
  messagingSenderId: "558505410408",
  appId: "1:558505410408:web:c72c3c2968091689d2e0dd",
  measurementId: "G-8D209HXCL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };