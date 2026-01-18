import { z } from "zod";

// --- Post Schema ---

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, alphanumeric, and hyphenated",
    ),
  subtitle: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
  coverImageUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  youtubeUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  published: z.boolean().default(false),
});

export type PostFormData = z.infer<typeof postSchema>;

// --- Ranking Schema ---

export const rankingItemSchema = z.object({
  rank: z.coerce.number().min(1, "Rank must be at least 1"),
  brand: z.string().min(1, "Brand is required"),
  productName: z.string().min(1, "Product Name is required"),
  productUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  notes: z.string().optional(),
});

export const rankingSnapshotSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase, alphanumeric, and hyphenated",
    ),
  source: z.string().min(1, "Source is required"),
  category: z.string().min(1, "Category is required"),
  capturedAt: z.string().min(1, "Date is required"),
  items: z
    .array(rankingItemSchema)
    .min(1, "At least one ranking item is required"),
  summary: z.string().optional(),
  coverImageUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  published: z.boolean().default(false),
});

export type RankingSnapshotFormData = z.infer<typeof rankingSnapshotSchema>;
export type RankingItemFormData = z.infer<typeof rankingItemSchema>;

// --- Newsletter Schema ---

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
