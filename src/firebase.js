import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCWzyEL0_bB7tkFs_KEDctcw7iNwiYR0mw",
  authDomain: "sf-sys-forms.firebaseapp.com",
  databaseURL: "https://sf-sys-forms-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sf-sys-forms",
  storageBucket: "sf-sys-forms.firebasestorage.app",
  messagingSenderId: "649493071442",
  appId: "1:649493071442:web:a622ab7fd8025268aec18b"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
