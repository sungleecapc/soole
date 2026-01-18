import "server-only";
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

// Helper to remove newlines from private key in env vars
function formatPrivateKey(key: string | undefined) {
  return key?.replace(/\\n/g, "\n");
}

let adminApp;

if (getApps().length === 0) {
  // Only initialize if we have the private key (server-side)
  if (process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    adminApp = initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: formatPrivateKey(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }
} else {
  adminApp = getApp();
}

// Export the singleton instances
// Note: These might be undefined if env vars are missing during build time
export const adminDb = adminApp ? getFirestore(adminApp) : null;
export const adminAuth = adminApp ? getAuth(adminApp) : null;
export const adminStorage = adminApp ? getStorage(adminApp) : null;
