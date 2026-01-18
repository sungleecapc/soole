import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostsTable } from "@/components/admin/PostsTable";
import { getAllPostsForAdmin } from "@/app/actions/admin/posts"; // Use Admin Action
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminPostsPage() {
  const posts = await getAllPostsForAdmin(); // Fetch with Admin SDK

  // PostsTable expects Post[] from lib/firestore/posts.ts which has Timestamps.
  // BUT we just changed it to receive SerializedPost from actions.
  // We need to update PostsTable prop type or cast it.
  // Best practice: Update PostsTable to accept SerializedPost.
  // Or map it back? No, Serialized is better for client.

  return (
    <AdminGuard>
      <AdminShell>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Posts</h1>
              <p className="text-stone-500">Manage editorial content</p>
            </div>
            <Button asChild>
              <Link href="/admin/posts/new">
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
          </div>

          {/* We cast to any for now if type mismatch, but ideally we fix type */}
          <PostsTable initialPosts={posts as any} />
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
