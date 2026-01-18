"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Repeat, Globe } from "lucide-react";

export function WhatWeDo() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="rankings">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-none bg-stone-50/50 dark:bg-stone-900/20 hover:bg-stone-100 dark:hover:bg-stone-900/40 transition-colors duration-500">
          <CardHeader>
            <BarChart3 className="w-6 h-6 text-stone-400 mb-4" />
            <CardTitle className="text-lg font-medium">
              Real-Time Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-500 text-sm leading-loose">
              We monitor daily rankings across major Korean platforms (Olive
              Young, Hwahae) to capture shifting trends before they saturate.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-stone-50/50 dark:bg-stone-900/20 hover:bg-stone-100 dark:hover:bg-stone-900/40 transition-colors duration-500">
          <CardHeader>
            <Repeat className="w-6 h-6 text-stone-400 mb-4" />
            <CardTitle className="text-lg font-medium">
              Consistency Over Hype
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-500 text-sm leading-loose">
              Viral hits fade. We focus on products that maintain high
              repurchase rates and consistent 4.5+ ratings over months.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-stone-50/50 dark:bg-stone-900/20 hover:bg-stone-100 dark:hover:bg-stone-900/40 transition-colors duration-500">
          <CardHeader>
            <Globe className="w-6 h-6 text-stone-400 mb-4" />
            <CardTitle className="text-lg font-medium">Global Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-500 text-sm leading-loose">
              We translate local Korean consumer sentiment into English-first
              insights, bridging the gap between Seoul and the world.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
