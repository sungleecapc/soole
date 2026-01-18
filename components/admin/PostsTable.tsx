"use client";

import { useState } from "react";
import { SerializedPost } from "@/app/actions/admin/posts"; // Update import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { deletePostAction } from "@/app/actions/admin/posts";
import { useRouter } from "next/navigation";

interface PostsTableProps {
  initialPosts: SerializedPost[];
}

export function PostsTable({ initialPosts }: PostsTableProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const router = useRouter();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "published"
          ? post.published
          : !post.published;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await deletePostAction(id);
    setPosts(posts.filter((p) => p.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-stone-500" />
          <Input
            placeholder="Search posts..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "published" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("published")}
          >
            Published
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("draft")}
          >
            Drafts
          </Button>
        </div>
      </div>

      <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge
                        variant="default"
                        className="bg-green-600 hover:bg-green-600"
                      >
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell
                    className="text-stone-500 font-mono text-xs max-w-[150px] truncate"
                    title={post.slug}
                  >
                    {post.slug}
                  </TableCell>
                  <TableCell className="text-stone-500 text-sm">
                    {/* Safe date parsing for ISO string */}
                    {post.updatedAt
                      ? format(new Date(post.updatedAt), "MMM d")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/posts/${post.id}`}>
                          <Edit2 className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-stone-500"
                >
                  No posts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
