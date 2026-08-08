import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../firebase/serviceAccountKey.json" with { type: "json" };

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });

  console.log("✅ Firebase Admin Initialized");
}

const auth = getAuth();

export { auth };