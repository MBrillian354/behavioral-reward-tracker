import { requireRole } from '@/lib/actions/auth';
import { Navbar } from '@/components/shared/navbar';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole('student');

  return (
    <div className="min-h-screen bg-[var(--md-surface)]">
      <Navbar role={session.role} displayName={session.displayName} />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
