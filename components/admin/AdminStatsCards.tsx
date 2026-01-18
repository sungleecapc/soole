import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ListOrdered, Users } from "lucide-react";

interface Stats {
  posts: { total: number; published: number; drafts: number };
  rankings: { total: number; published: number; drafts: number };
  newsletter: { total: number };
}

export function AdminStatsCards({ stats }: { stats: Stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Posts</CardTitle>
          <FileText className="h-4 w-4 text-stone-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.posts.total}</div>
          <p className="text-xs text-stone-500 mt-1">
            {stats.posts.published} published, {stats.posts.drafts} drafts
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Rankings</CardTitle>
          <ListOrdered className="h-4 w-4 text-stone-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.rankings.total}</div>
          <p className="text-xs text-stone-500 mt-1">
            {stats.rankings.published} published, {stats.rankings.drafts} drafts
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Newsletter</CardTitle>
          <Users className="h-4 w-4 text-stone-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newsletter.total}</div>
          <p className="text-xs text-stone-500 mt-1">Total signups</p>
        </CardContent>
      </Card>
    </div>
  );
}
