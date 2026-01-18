import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { RankingsTable } from "@/components/admin/RankingsTable";
import { getAllRankingsForAdmin } from "@/app/actions/admin/rankings"; // Use Admin Action
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function AdminRankingsPage() {
  const rankings = await getAllRankingsForAdmin();

  return (
    <AdminGuard>
      <AdminShell>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Rankings
              </h1>
              <p className="text-stone-500">Manage ranking snapshots</p>
            </div>
            <Button asChild>
              <Link href="/admin/rankings/new">
                <Plus className="mr-2 h-4 w-4" /> New Ranking
              </Link>
            </Button>
          </div>

          <RankingsTable initialRankings={rankings as any} />
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
