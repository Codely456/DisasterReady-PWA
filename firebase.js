import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { initializeAuth, indexedDBLocalPersistence } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyASl_-RXNvTJuAeXIFOGWZda2Bz02COmJs",
  authDomain: "project-sih001.firebaseapp.com",
  projectId: "project-sih001",
  storageBucket: "project-sih001.appspot.com",
  messagingSenderId: "619736882198",
  appId: "1:619736882198:web:1d86e3f300ba1c21ed6937",
  measurementId: "G-M7SDNLPSDW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
});
const db = getFirestore(app);

export { auth, db };
