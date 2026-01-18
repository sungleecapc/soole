export function Footer() {
  return (
    <footer className="py-12 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-stone-500">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
          >
            Rankings
          </a>
          <a
            href="#"
            className="hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
          >
            Contact
          </a>
        </div>
        <p className="font-serif italic opacity-70 mt-4">
          SOOLE (술레) discovers what’s already valued — gently revealed.
        </p>
        <p className="text-xs mt-8 opacity-50">
          © {new Date().getFullYear()} Soole Beauty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
