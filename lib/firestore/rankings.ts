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
import { RankingSnapshotFormData } from "@/lib/validators";

const COLLECTION = "ranking_snapshots";

export interface RankingSnapshot extends RankingSnapshotFormData {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}

// Admin: List all rankings
export async function getAllRankings(): Promise<RankingSnapshot[]> {
  const q = query(collection(db, COLLECTION), orderBy("updatedAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as RankingSnapshot,
  );
}

// Public: List only published rankings
export async function getPublishedRankings(): Promise<RankingSnapshot[]> {
  const q = query(
    collection(db, COLLECTION),
    where("published", "==", true),
    orderBy("publishedAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() }) as RankingSnapshot,
  );
}

// Get single ranking by ID
export async function getRanking(id: string): Promise<RankingSnapshot | null> {
  const docRef = doc(db, COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as RankingSnapshot;
}

// Get single ranking by Slug (Public)
export async function getRankingBySlug(
  slug: string,
): Promise<RankingSnapshot | null> {
  const q = query(
    collection(db, COLLECTION),
    where("slug", "==", slug),
    where("published", "==", true),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() } as RankingSnapshot;
}

// Create Ranking
export async function createRanking(
  data: RankingSnapshotFormData,
): Promise<string> {
  const now = serverTimestamp();
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.published ? now : null,
  });
  return docRef.id;
}

// Update Ranking
export async function updateRanking(
  id: string,
  data: RankingSnapshotFormData,
): Promise<void> {
  const docRef = doc(db, COLLECTION, id);
  const updateData: any = {
    ...data,
    updatedAt: serverTimestamp(),
  };

  if (data.published) {
    updateData.publishedAt = serverTimestamp();
  } else {
    updateData.publishedAt = null;
  }

  await updateDoc(docRef, updateData);
}
