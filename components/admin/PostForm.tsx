"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postSchema, PostFormData } from "@/lib/validators";
import {
  createPostAction,
  updatePostAction,
  deletePostAction,
} from "@/app/actions/admin/posts";
import { CoverUploader } from "./CoverUploader";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ExternalLink, Wand2, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Allow generic ID + serialized strings
interface PostFormProps {
  initialData?: any;
}

export function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          // Ensure explicit default values if fields missing
          youtubeUrl: initialData.youtubeUrl || "",
          published: !!initialData.published,
        }
      : {
          title: "",
          slug: "",
          subtitle: "",
          content: "",
          tags: "",
          coverImageUrl: "",
          youtubeUrl: "",
          published: false,
        },
  });

  const slugValue = form.watch("slug");

  const generateSlug = () => {
    const title = form.getValues("title");
    if (!title) return;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    form.setValue("slug", slug);
  };

  const onSubmit = async (data: PostFormData) => {
    setLoading(true);
    try {
      if (initialData?.id) {
        await updatePostAction(initialData.id, data);
        toast({
          title: "Post updated",
          description: "Changes saved successfully.",
        });
        router.push("/admin/posts");
      } else {
        await createPostAction(data);
        toast({
          title: "Post created",
          description: "New post has been created.",
        });
        router.push("/admin/posts");
      }
    } catch (error) {
      console.error("Error saving post", error);
      toast({
        title: "Error",
        description: "Failed to save post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Delete this post permanently?")) return;

    setLoading(true);
    try {
      await deletePostAction(initialData.id);
      toast({ title: "Post deleted" });
      router.push("/admin/posts");
    } catch (error) {
      toast({ title: "Error deleting", variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary or hook..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content (Markdown)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="# Write your post..."
                      className="min-h-[400px] font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cover Image Upload (Moved here for flow, usually sidebar but user asked for fields in form) */}
            <div className="space-y-2">
              <FormLabel>Cover Image</FormLabel>
              <CoverUploader
                slug={slugValue}
                folder="posts"
                currentUrl={form.getValues("coverImageUrl")}
                onUpload={(url) => form.setValue("coverImageUrl", url)}
              />
            </div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <div className="p-4 rounded-md border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 space-y-4">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white dark:bg-stone-950">
                    <div className="space-y-0.5">
                      <FormLabel>Published</FormLabel>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {initialData?.id && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a
                    href={`/insights/${slugValue}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Preview Post
                  </a>
                </Button>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? "Save Changes" : "Create Post"}
              </Button>

              {initialData?.id && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Post
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="post-url-slug" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={generateSlug}
                        title="Generate from Title"
                      >
                        <Wand2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormDescription>URL-friendly identifier.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input placeholder="separated, by, commas" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="youtubeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://youtube.com/..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
