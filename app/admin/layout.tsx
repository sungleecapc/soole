export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100">
      {children}
    </div>
  );
}
