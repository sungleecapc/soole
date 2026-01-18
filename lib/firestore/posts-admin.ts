import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";
import type { Post } from "@/lib/firestore/posts";

// Helper to sanitize Admin Timestamp to Client-safe format (or compatible structure)
// The existing components expect `Timestamp` from firebase/firestore which has .toDate()
// Admin SDK Timestamp also has .toDate().
// However, passing complex objects from Server to Client components in Next.js can trigger warnings
// if not pure JSON. But for now, we try to match the expected interface to minimize refactor.

const COLLECTION = "posts";

export async function getAllPostsAdmin(): Promise<Post[]> {
  if (!adminDb) return [];
  const snapshot = await adminDb
    .collection(COLLECTION)
    .orderBy("updatedAt", "desc")
    .get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as unknown as Post,
  );
}

export async function getPublishedPostsAdmin(): Promise<Post[]> {
  if (!adminDb) return [];
  const snapshot = await adminDb
    .collection(COLLECTION)
    .where("published", "==", true)
    .orderBy("publishedAt", "desc")
    .get();
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as unknown as Post,
  );
}

export async function getPostBySlugAdmin(slug: string): Promise<Post | null> {
  if (!adminDb) return null;
  const snapshot = await adminDb
    .collection(COLLECTION)
    .where("slug", "==", slug)
    .where("published", "==", true)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as unknown as Post;
}
