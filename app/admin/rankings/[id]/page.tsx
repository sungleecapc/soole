import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { RankingForm } from "@/components/admin/RankingForm";
import { getRankingForAdmin } from "@/app/actions/admin/rankings"; // Use Admin Action
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditRankingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRankingPage({
  params,
}: EditRankingPageProps) {
  const { id } = await params;
  const ranking = await getRankingForAdmin(id);

  if (!ranking) {
    notFound();
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Edit Ranking</h1>
            <p className="text-stone-500 text-sm font-mono mt-2">
              ID: {ranking.id}
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-8 rounded-lg border border-stone-200 dark:border-stone-800">
            <RankingForm initialData={ranking as any} />
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
