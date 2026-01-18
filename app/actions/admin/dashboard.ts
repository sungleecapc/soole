"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function getDashboardStats() {
  if (!adminDb) return null;

  try {
    const postsSnap = await adminDb.collection("posts").get();
    const rankingsSnap = await adminDb.collection("ranking_snapshots").get();
    // Newsletter might be a different collection or just stored in firestore
    const newsletterSnap = await adminDb.collection("newsletter_signups").get();

    const posts = postsSnap.docs.map((d) => d.data());
    const rankings = rankingsSnap.docs.map((d) => d.data());

    return {
      posts: {
        total: posts.length,
        published: posts.filter((p) => p.published).length,
        drafts: posts.filter((p) => !p.published).length,
      },
      rankings: {
        total: rankings.length,
        published: rankings.filter((r) => r.published).length,
        drafts: rankings.filter((r) => !r.published).length,
      },
      newsletter: {
        total: newsletterSnap.size,
      },
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}

export async function getRecentActivity() {
  if (!adminDb) return [];

  // Fetch recent posts/ranked items
  // Since we don't have a unified activity log, we just query top 5 from each and merge sorted
  const postsQuery = await adminDb
    .collection("posts")
    .orderBy("updatedAt", "desc")
    .limit(5)
    .get();
  const rankingsQuery = await adminDb
    .collection("ranking_snapshots")
    .orderBy("updatedAt", "desc")
    .limit(5)
    .get();

  const activities = [
    ...postsQuery.docs.map((d) => ({ type: "Post", id: d.id, ...d.data() })),
    ...rankingsQuery.docs.map((d) => ({
      type: "Ranking",
      id: d.id,
      ...d.data(),
    })),
  ];

  // Sort combined list by updatedAt descending
  return activities
    .sort((a: any, b: any) => {
      const dateA = a.updatedAt?.toDate ? a.updatedAt.toDate() : a.updatedAt;
      const dateB = b.updatedAt?.toDate ? b.updatedAt.toDate() : b.updatedAt;
      return dateB - dateA;
    })
    .slice(0, 8);
}
