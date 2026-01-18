import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-white/5 dark:border-white/5">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          SOOLE
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-300">
          <Link
            href="/#rankings"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Rankings
          </Link>
          <Link
            href="/#method"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            Method
          </Link>
          <Link
            href="/about"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/youtube"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            YouTube
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </div>
    </header>
  );
}
