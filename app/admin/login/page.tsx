"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/admin");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-stone-50 dark:bg-stone-950">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
            SOOLE Admin
          </h1>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Sign in to manage content
          </p>
        </div>

        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-full h-12 text-base font-medium"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign in with Google"
          )}
        </Button>
      </div>
    </div>
  );
}
