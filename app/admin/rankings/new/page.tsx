"use client";

import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { RankingForm } from "@/components/admin/RankingForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewRankingPage() {
  return (
    <AdminGuard>
      <AdminShell>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              className="mb-4 pl-0 hover:bg-transparent hover:text-stone-600"
            >
              <Link href="/admin/rankings">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Rankings
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Create New Ranking
            </h1>
          </div>

          <div className="bg-white dark:bg-stone-900 p-8 rounded-lg border border-stone-200 dark:border-stone-800">
            <RankingForm />
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
