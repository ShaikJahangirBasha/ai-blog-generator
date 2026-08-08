import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQ-eil6n8lnkE5fcBobg62AxOtQrboB-c",
  authDomain: "ai-blog-generator-20378.firebaseapp.com",
  projectId: "ai-blog-generator-20378",
  storageBucket: "ai-blog-generator-20378.firebasestorage.app",
  messagingSenderId: "686710733725",
  appId: "1:686710733725:web:5825280837967491fb0d74",
  measurementId: "G-DKF3CHLRTE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();

export default app;