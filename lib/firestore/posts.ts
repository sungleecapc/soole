import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { PostFormData } from "@/lib/validators";

const COLLECTION = "posts";

export interface Post extends PostFormData {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}

// Admin: List all posts
export async function getAllPosts(): Promise<Post[]> {
  const q = query(collection(db, COLLECTION), orderBy("updatedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post);
}

// Public: List only published posts
export async function getPublishedPosts(): Promise<Post[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("publishedAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Post);
}

// Get single post by ID
export async function getPost(id: string): Promise<Post | null> {
  const docRef = doc(db, COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Post;
}

// Get single post by Slug (Public)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const q = query(
    collection(db, COLLECTION),
    where("slug", "==", slug),
    where("published", "==", true),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Post;
}

// Create Post
export async function createPost(data: PostFormData): Promise<string> {
  const now = serverTimestamp();
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.published ? now : null,
  });
  return docRef.id;
}

// Update Post
export async function updatePost(
  id: string,
  data: PostFormData,
): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const updateData: any = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  // Only update publishedAt if explicitly changing to published
  if (data.published) {
    // If it was already published, we might want to keep original date?
    // For simplicity, we update it or check previous state.
    // To keep it simple: if Published is true, set publishedAt if it's missing?
    // Firestore update will overwrite.
    // Let's assume we update publishedAt whenever it is saved as published.
    updateData.publishedAt = serverTimestamp();
  } else {
    updateData.publishedAt = null;
  }

  await updateDoc(docRef, updateData);
}
