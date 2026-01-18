"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

interface CoverUploaderProps {
  slug: string;
  folder: "posts" | "rankings";
  currentUrl?: string;
  onUpload: (url: string) => void;
}

export function CoverUploader({
  slug,
  folder,
  currentUrl,
  onUpload,
}: CoverUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(currentUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !slug) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `covers/${folder}/${slug}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring if needed
        },
        (error) => {
          console.error("Upload failed", error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setPreview(downloadURL);
          onUpload(downloadURL);
          setUploading(false);
        },
      );
    } catch (error) {
      console.error("Error uploading", error);
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    onUpload("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {preview ? (
          <div className="relative w-40 h-24 rounded-md overflow-hidden border border-stone-200 dark:border-stone-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Cover"
              className="object-cover w-full h-full"
            />
            <button
              onClick={handleRemove}
              type="button"
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-40 h-24 rounded-md border-2 border-dashed border-stone-200 dark:border-stone-800 flex items-center justify-center text-stone-400">
            <span className="text-xs">No image</span>
          </div>
        )}

        <div>
          <input
            type="file"
            accept="image/*"
            id="cover-upload"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading || !slug}
          />
          <label htmlFor="cover-upload">
            <Button
              type="button"
              variant="outline"
              size="sm"
              asChild
              disabled={uploading || !slug}
              className="cursor-pointer"
            >
              <span>
                {uploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                Upload Cover
              </span>
            </Button>
          </label>
          {!slug && (
            <p className="text-xs text-red-500 mt-1">Enter slug first</p>
          )}
        </div>
      </div>
    </div>
  );
}
