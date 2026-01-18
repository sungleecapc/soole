"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  rankingSnapshotSchema,
  RankingSnapshotFormData,
} from "@/lib/validators";
import {
  createRankingAction,
  updateRankingAction,
  deleteRankingAction,
} from "@/app/actions/admin/rankings";
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
import {
  Loader2,
  Plus,
  Trash2,
  GripVertical,
  Wand2,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RankingFormProps {
  initialData?: any;
}

export function RankingForm({ initialData }: RankingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<RankingSnapshotFormData>({
    resolver: zodResolver(rankingSnapshotSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      source: initialData?.source ?? "",
      category: initialData?.category ?? "",
      capturedAt:
        initialData?.capturedAt ?? new Date().toISOString().split("T")[0],
      summary: initialData?.summary ?? "",
      coverImageUrl: initialData?.coverImageUrl ?? "",
      published: initialData?.published ?? false,
      items: initialData?.items ?? [
        { rank: 1, brand: "", productName: "", productUrl: "", notes: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
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

  const autofillRanks = () => {
    const currentItems = form.getValues("items");
    const updated = currentItems.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
    form.setValue("items", updated);
    toast({
      title: "Ranks updated",
      description: "Items re-numbered sequentially.",
    });
  };

  const onSubmit = async (data: RankingSnapshotFormData) => {
    setLoading(true);
    try {
      if (initialData?.id) {
        await updateRankingAction(initialData.id, data);
        toast({ title: "Ranking updated" });
        router.push("/admin/rankings");
      } else {
        await createRankingAction(data);
        toast({ title: "Ranking created" });
        router.push("/admin/rankings");
      }
    } catch (error) {
      console.error("Error saving ranking", error);
      toast({
        title: "Error",
        description: "Failed to save ranking.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm("Delete this ranking?")) return;
    setLoading(true);
    await deleteRankingAction(initialData.id);
    router.push("/admin/rankings");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-5xl"
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Olive Young Sunscreen"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="oliveyoung">Olive Young</SelectItem>
                        <SelectItem value="donki">
                          Don Quijote (Donki)
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Sunscreen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Ranking Items</h3>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={autofillRanks}
                  >
                    Auto-number 1..N
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        rank: fields.length + 1,
                        brand: "",
                        productName: "",
                        productUrl: "",
                        notes: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.id}
                    className="relative bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-stone-400 hover:text-red-500 h-8 w-8 p-0"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <CardContent className="p-4 space-y-4 pt-8">
                      <div className="flex gap-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.rank`}
                          render={({ field }) => (
                            <FormItem className="w-20">
                              <FormLabel className="text-xs">Rank</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    field.onChange(e.target.valueAsNumber)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.brand`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-xs">Brand</FormLabel>
                              <FormControl>
                                <Input placeholder="Brand" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`items.${index}.productName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">
                              Product Name
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Product Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`items.${index}.productUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">
                              Link (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Editorial Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Short commentary..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Sidebar */}
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
                    href={`/rankings/${slugValue}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Preview
                  </a>
                </Button>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? "Save Ranking" : "Create Ranking"}
              </Button>

              {initialData?.id && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete Ranking
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="slug" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={generateSlug}
                      title="Generate"
                    >
                      <Wand2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capturedAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Captured Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Cover Image</FormLabel>
              <CoverUploader
                slug={slugValue}
                folder="rankings"
                currentUrl={form.getValues("coverImageUrl")}
                onUpload={(url) => form.setValue("coverImageUrl", url)}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
