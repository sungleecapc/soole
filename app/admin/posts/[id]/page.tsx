import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostForm } from "@/components/admin/PostForm";
import { getPostForAdmin } from "@/app/actions/admin/posts"; // Use Admin Action
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostForAdmin(id);

  if (!post) {
    notFound();
  }

  // We need to cast SerializedPost to Post (from lib/firestore/posts) for PostForm?
  // Actually PostForm expects Post interface (with Timestamps).
  // Strategy: Update PostForm to accept SerializedPost/PostFormData or cast.
  // Ideally, Client Component forms should work with JSON serializable data (Strings/Dates) anyway.
  // Let's check PostForm props type.
  // It uses Post which has Timestamp.
  // We should update PostForm to accept SerializedPost.

  return (
    <AdminGuard>
      <AdminShell>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="mb-4 pl-0 hover:bg-transparent hover:text-stone-600"
            >
              <Link href="/admin/posts">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-stone-500 text-sm font-mono mt-2">
              ID: {post.id}
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-8 rounded-lg border border-stone-200 dark:border-stone-800">
            <PostForm initialData={post as any} />
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
