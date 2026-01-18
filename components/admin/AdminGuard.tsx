"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { isUserAllowed } from "@/lib/auth/adminAllowlist";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Check allowlist
        // Note: Ideally this check should also happen server-side or via custom claims
        // But for this simple requirement, checking strictly against env var list is acceptable
        // We will call a server action or just verify email here if allowlist is public?
        // Wait, isUserAllowed was created as a helper. If it uses process.env, it only works on server?
        // Ah, env vars prefixed with NEXT_PUBLIC are client side.
        // ADMIN_EMAILS is likely a server-side secret if we want to hide who is admin.
        // So we strictly need a Server Action to verify this, OR we just check on client if we don't mind exposing the email list in bundle (bad).
        // A better approach for the guard is to allow signed-in users to see the protected content *loader*,
        // but the data fetching itself will fail if they aren't admin.
        // FOR NOW: Let's assume we implement a quick Server Action check.

        // Actually, for simplicity in this turn, I will implement a client-side check
        // assuming I can verify the email.
        // But wait, allowlist is in lib/auth which uses process.env.ADMIN_EMAILS.
        // That env var is NOT exposed to client unless it starts with NEXT_PUBLIC.
        // So I need a server action.

        // Let's create a server action for verification.
        const isAllowed = await verifyAdmin(currentUser.email);
        setAllowed(isAllowed);
        if (!isAllowed) {
          // stay on page but show denied?
        }
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Server Action inline or imported?
  // I cannot define Server Action inside useEffect.
  // I will create a separate `app/admin/actions.ts` for this.
  // For now, I'll stub the fetch.

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  if (!allowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-stone-500">
          You are not authorized to view this area.
        </p>
        <button onClick={() => auth.signOut()} className="underline">
          Sign Out
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

// Temporary Stub until I create the action file
async function verifyAdmin(email: string | null): Promise<boolean> {
  if (!email) return false;
  // We need to call an API route or Server Action.
  // Let's assume we'll simply fetch from an API route I'll create: /api/auth/verify-admin
  // OR simpler: I will assume for this step I am creating the action next.
  // Let's actually use a Server Action.

  // I'll create `app/admin/check-admin/route.ts`? No, Server Actions are better.
  // usage: import { checkAdmin } from './actions'
  // But I haven't created it yet.

  // WORKAROUND: I will just fetch a server action I will create in `app/admin/actions.ts`.
  // For this compilation to work, I need that file.

  const response = await fetch("/api/admin/verify", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (response.ok) {
    const data = await response.json();
    return data.allowed;
  }
  return false;
}
