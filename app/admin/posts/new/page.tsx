"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostForm } from "@/components/admin/PostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">
              Create New Post
            </h1>
          </div>

          <div className="bg-white dark:bg-stone-900 p-8 rounded-lg border border-stone-200 dark:border-stone-800">
            <PostForm />
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
