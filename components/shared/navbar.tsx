'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/lib/supabase/types';

interface NavbarProps {
  role: UserRole;
  displayName: string;
}

export function Navbar({ role, displayName }: NavbarProps) {
  const pathname = usePathname();
  
  const adminLinks = [
    { href: '/admin', label: 'Dasbor' },
    { href: '/admin/tasks', label: 'Tugas' },
    { href: '/admin/deductions', label: 'Deduksi' },
    { href: '/admin/student', label: 'Siswa' },
    { href: '/admin/logs', label: 'Riwayat' },
  ];
  
  const studentLinks = [
    { href: '/student', label: 'Dasbor' },
    { href: '/student/tracker', label: 'Pelacak' },
    { href: '/student/report', label: 'Lapor' },
    { href: '/student/history', label: 'Riwayat' },
  ];
  
  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <nav className="bg-[var(--md-surface-container)] border-b border-[var(--md-outline-variant)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href={role === 'admin' ? '/admin' : '/student'} className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="md-title-medium text-[var(--md-on-surface)] hidden sm:block">
                Reward Tracker
              </span>
            </Link>
            
            <div className="flex items-center gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href || 
                  (link.href !== '/admin' && link.href !== '/student' && pathname.startsWith(link.href));
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      px-3 py-2 rounded-full md-label-large transition-colors
                      ${isActive 
                        ? 'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)]' 
                        : 'text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-high)]'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="md-body-medium text-[var(--md-on-surface-variant)]">
              {displayName}
            </span>
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="px-4 py-2 rounded-full md-label-large text-[var(--md-error)] hover:bg-[var(--md-error)]/8 transition-colors"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
