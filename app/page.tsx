import { BrandHero } from "@/components/BrandHero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Method } from "@/components/sections/Method";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play } from "lucide-react";

import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col">
      <Header />

      {/* Hero Section */}
      <BrandHero />

      <WhatWeDo />
      <Method />
      <Newsletter />
      <Footer />
    </main>
  );
}
