import {
  initializeApp,
  cert,
  getApps,
} from "firebase-admin/app";

import {
  getAuth,
} from "firebase-admin/auth";

/* ==========================================
   Firebase Admin Configuration
========================================== */

let serviceAccount;

try {
  const encodedServiceAccount =
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!encodedServiceAccount) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_BASE64 is not configured."
    );
  }

  const decodedServiceAccount =
    Buffer.from(
      encodedServiceAccount,
      "base64"
    ).toString("utf8");

  serviceAccount =
    JSON.parse(decodedServiceAccount);

} catch (error) {
  console.error(
    "❌ Failed to load Firebase service account:",
    error.message
  );

  throw error;
}

/* ==========================================
   Initialize Firebase Admin
========================================== */

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });

  console.log(
    "✅ Firebase Admin Initialized"
  );
}

/* ==========================================
   Firebase Admin Auth
========================================== */

const auth = getAuth();

export { auth };