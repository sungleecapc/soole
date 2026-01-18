import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatsCards } from "@/components/admin/AdminStatsCards";
import {
  getDashboardStats,
  getRecentActivity,
} from "@/app/actions/admin/dashboard";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const revalidate = 0; // Dynamic

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const recentActivity = await getRecentActivity();

  return (
    <AdminGuard>
      <AdminShell>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-stone-500">Welcome back to SOOLE Admin.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/admin/rankings/new">
                  <Plus className="mr-2 h-4 w-4" /> New Ranking
                </Link>
              </Button>
            </div>
          </div>

          {stats ? (
            <AdminStatsCards stats={stats} />
          ) : (
            <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800 text-sm">
              Stats could not be loaded. Check Firebase Admin credentials.
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <div className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                {recentActivity.length === 0 ? (
                  <div className="p-8 text-center text-stone-500 text-sm">
                    No activity yet.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {recentActivity.map((item: any) => (
                      <div
                        key={item.id}
                        className="p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-sm flex items-center gap-2">
                            <span className="text-xs uppercase tracking-wider text-stone-400 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">
                              {item.type}
                            </span>
                            {item.title}
                          </p>
                          <p className="text-xs text-stone-500 mt-1">
                            Updated{" "}
                            {item.updatedAt?.toDate
                              ? format(item.updatedAt.toDate(), "MMM d, h:mm a")
                              : "Recently"}
                          </p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link
                            href={
                              item.type === "Post"
                                ? `/admin/posts/${item.id}`
                                : `/admin/rankings/${item.id}`
                            }
                          >
                            Edit
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Quick Links</h2>
              <div className="grid gap-4">
                <Button
                  asChild
                  variant="outline"
                  className="justify-start h-auto py-4"
                >
                  <Link href="/insights" target="_blank">
                    <ExternalLink className="mr-2 h-5 w-5 text-stone-400" />
                    <div className="text-left">
                      <div className="font-medium">View Live Insights</div>
                      <div className="text-xs text-stone-500">
                        Check the public blog feed
                      </div>
                    </div>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="justify-start h-auto py-4"
                >
                  <Link href="/rankings" target="_blank">
                    <ExternalLink className="mr-2 h-5 w-5 text-stone-400" />
                    <div className="text-left">
                      <div className="font-medium">View Live Rankings</div>
                      <div className="text-xs text-stone-500">
                        Check public ranking snapshots
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}
