"use server";

import { adminDb } from "@/lib/firebase/admin";
import { PostFormData, postSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";

// Type definition for serialized post (safe for client)
export interface SerializedPost {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  content: string;
  tags?: string;
  coverImageUrl?: string;
  youtubeUrl?: string; // Add youtubeUrl
  published: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  publishedAt?: string | null; // ISO
}

function checkAdminDb() {
  if (!adminDb) {
    throw new Error("Firebase Admin not initialized. Check server env vars.");
  }
  return adminDb;
}

// Convert Firestore doc to SerializedPost
function mapPost(doc: FirebaseFirestore.QueryDocumentSnapshot): SerializedPost {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || "",
    slug: data.slug || "",
    subtitle: data.subtitle || "",
    content: data.content || "",
    tags: data.tags || "",
    coverImageUrl: data.coverImageUrl || "",
    youtubeUrl: data.youtubeUrl || "", // Ensure field is mapped
    published: !!data.published,
    createdAt:
      data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    updatedAt:
      data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
    publishedAt: data.publishedAt?.toDate().toISOString() || null,
  };
}

export async function getAllPostsForAdmin(): Promise<SerializedPost[]> {
  const db = checkAdminDb();
  const snap = await db.collection("posts").orderBy("updatedAt", "desc").get();
  return snap.docs.map(mapPost);
}

export async function getPostForAdmin(
  id: string,
): Promise<SerializedPost | null> {
  const db = checkAdminDb();
  const doc = await db.collection("posts").doc(id).get();
  if (!doc.exists) return null;
  return mapPost(doc as FirebaseFirestore.QueryDocumentSnapshot);
}

// ... existing actions (create, update, delete) ...

export async function createPostAction(data: PostFormData) {
  const db = checkAdminDb();
  const validated = postSchema.parse(data);

  const now = new Date();
  const docRef = await db.collection("posts").add({
    ...validated,
    createdAt: now,
    updatedAt: now,
    publishedAt: validated.published ? now : null,
  });

  revalidatePath("/admin/posts");
  revalidatePath("/insights");
  return { success: true, id: docRef.id };
}

export async function updatePostAction(id: string, data: PostFormData) {
  const db = checkAdminDb();
  const validated = postSchema.parse(data);

  const now = new Date();

  const updateData: any = {
    ...validated,
    updatedAt: now,
  };

  if (validated.published) {
    const snap = await db.collection("posts").doc(id).get();
    const current = snap.data();
    if (!current?.publishedAt) {
      updateData.publishedAt = now;
    }
  } else {
    updateData.publishedAt = null;
  }

  await db.collection("posts").doc(id).update(updateData);

  revalidatePath("/admin/posts");
  revalidatePath("/insights");
  revalidatePath(`/insights/${validated.slug}`);
  return { success: true };
}

export async function deletePostAction(id: string) {
  const db = checkAdminDb();
  await db.collection("posts").doc(id).delete();
  revalidatePath("/admin/posts");
  revalidatePath("/insights");
  return { success: true };
}
