"use server";

import { adminDb } from "@/lib/firebase/admin";
import {
  RankingSnapshotFormData,
  rankingSnapshotSchema,
} from "@/lib/validators";
import { revalidatePath } from "next/cache";

export interface SerializedRanking {
  id: string;
  title: string;
  slug: string;
  source: string;
  category: string;
  capturedAt: string;
  items: any[];
  summary?: string;
  coverImageUrl?: string;
  published: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  publishedAt?: string | null; // ISO
}

function checkAdminDb() {
  if (!adminDb) {
    throw new Error("Firebase Admin not initialized.");
  }
  return adminDb;
}

function mapRanking(
  doc: FirebaseFirestore.QueryDocumentSnapshot,
): SerializedRanking {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || "",
    slug: data.slug || "",
    source: data.source || "",
    category: data.category || "",
    capturedAt: data.capturedAt || "",
    items: data.items || [],
    summary: data.summary || "",
    coverImageUrl: data.coverImageUrl || "",
    published: !!data.published,
    createdAt:
      data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    updatedAt:
      data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
    publishedAt: data.publishedAt?.toDate().toISOString() || null,
  };
}

export async function getAllRankingsForAdmin(): Promise<SerializedRanking[]> {
  const db = checkAdminDb();
  const snap = await db
    .collection("ranking_snapshots")
    .orderBy("updatedAt", "desc")
    .get();
  return snap.docs.map(mapRanking);
}

export async function getRankingForAdmin(
  id: string,
): Promise<SerializedRanking | null> {
  const db = checkAdminDb();
  const doc = await db.collection("ranking_snapshots").doc(id).get();
  if (!doc.exists) return null;
  return mapRanking(doc as FirebaseFirestore.QueryDocumentSnapshot);
}

// ... existing actions (create, update, delete) ...

export async function createRankingAction(data: RankingSnapshotFormData) {
  const db = checkAdminDb();
  const validated = rankingSnapshotSchema.parse(data);

  const now = new Date();
  const docRef = await db.collection("ranking_snapshots").add({
    ...validated,
    createdAt: now,
    updatedAt: now,
    publishedAt: validated.published ? now : null,
  });

  revalidatePath("/admin/rankings");
  revalidatePath("/rankings");
  return { success: true, id: docRef.id };
}

export async function updateRankingAction(
  id: string,
  data: RankingSnapshotFormData,
) {
  const db = checkAdminDb();
  const validated = rankingSnapshotSchema.parse(data);

  const now = new Date();

  const updateData: any = {
    ...validated,
    updatedAt: now,
  };

  if (validated.published) {
    const snap = await db.collection("ranking_snapshots").doc(id).get();
    const current = snap.data();
    if (!current?.publishedAt) {
      updateData.publishedAt = now;
    }
  }

  await db.collection("ranking_snapshots").doc(id).update(updateData);

  revalidatePath("/admin/rankings");
  revalidatePath("/rankings");
  revalidatePath(`/rankings/${validated.slug}`);
  return { success: true };
}

export async function deleteRankingAction(id: string) {
  const db = checkAdminDb();
  await db.collection("ranking_snapshots").doc(id).delete();
  revalidatePath("/admin/rankings");
  revalidatePath("/rankings");
  return { success: true };
}
