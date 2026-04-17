import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // ВСТАВЬ СВОЙ КОНФИГ FIREBASE ЗДЕСЬ
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "YOUR_PROJECT",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
