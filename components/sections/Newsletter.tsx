"use client";

import { useTransition, useState } from "react";
import { newsletterSchema } from "@/lib/validators";
import { addNewsletterSignup } from "@/lib/firestore/newsletter";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function Newsletter() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = newsletterSchema.safeParse({ email });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    startTransition(async () => {
      const dbResult = await addNewsletterSignup(email);
      if (dbResult.success) {
        toast({
          title: "Subscribed",
          description: "Welcome to the inner circle.",
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section
      className="py-24 px-4 bg-stone-50 dark:bg-stone-900/20"
      id="newsletter"
    >
      <div className="max-w-md mx-auto relative z-10">
        <Card className="border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-sm shadow-sm transition-colors">
          <CardHeader>
            <CardTitle className="text-xl font-serif font-light tracking-wide italic">
              Monthly Radar
            </CardTitle>
            <CardDescription className="text-stone-500 dark:text-stone-400">
              Receive a quiet summary of products with high repurchase rates in
              Seoul.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-transparent border-stone-200 dark:border-stone-800 focus-visible:ring-stone-400"
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-stone-900 dark:bg-stone-200 text-stone-50 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white transition-colors"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-xs text-red-500 font-medium">{error}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
