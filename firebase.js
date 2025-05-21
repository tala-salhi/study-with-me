// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "studywithme-8439a.firebaseapp.com",
  projectId: "studywithme-8439a",
  storageBucket: "studywithme-8439a.appspot.com",
  messagingSenderId: "302949177439",
  appId: "1:302949177439:web:2c6d2be0cffffa01fc63ea"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
