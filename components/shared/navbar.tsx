'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/lib/supabase/types';
import { useTranslation } from '@/lib/i18n';
import { LanguageSwitch } from './language-switch';
import { Icon } from '@/components/ui/icon';

interface NavbarProps {
  role: UserRole;
  displayName: string;
}

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

export function Navbar({ role, displayName }: NavbarProps) {
  const pathname = usePathname();
  const { t } = useTranslation('nav');
  
  const adminLinks: NavLink[] = [
    { href: '/admin', label: t('dashboard'), icon: 'dashboard' },
    { href: '/admin/tasks', label: t('tasks'), icon: 'assignment' },
    { href: '/admin/deductions', label: t('deductions'), icon: 'remove_circle' },
    { href: '/admin/student', label: t('student'), icon: 'person' },
    { href: '/admin/logs', label: t('history'), icon: 'history' },
  ];
  
  const studentLinks: NavLink[] = [
    { href: '/student', label: t('dashboard'), icon: 'dashboard' },
    { href: '/student/tracker', label: t('tracker'), icon: 'check_circle' },
    { href: '/student/report', label: t('report'), icon: 'flag' },
    { href: '/student/history', label: t('history'), icon: 'history' },
  ];
  
  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      {/* Top App Bar - Hidden on mobile, visible on desktop */}
      <nav className="hidden sm:block bg-[var(--md-surface-container)] border-b border-[var(--md-outline-variant)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href={role === 'admin' ? '/admin' : '/student'} className="flex items-center gap-2">
                <Icon name="emoji_events" className="text-[var(--md-primary)]" size="large" />
                <span className="md-title-medium text-[var(--md-on-surface)]">
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
                        px-3 py-2 rounded-full md-label-large transition-colors flex items-center gap-2
                        ${isActive 
                          ? 'bg-[var(--md-secondary-container)] text-[var(--md-on-secondary-container)]' 
                          : 'text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-high)]'
                        }
                      `}
                    >
                      <Icon name={link.icon} size="small" />
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitch />
              <span className="md-body-medium text-[var(--md-on-surface-variant)]">
                {displayName}
              </span>
              <form action="/api/logout" method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full md-label-large text-[var(--md-error)] hover:bg-[var(--md-error)]/8 transition-colors flex items-center gap-2"
                >
                  <Icon name="logout" size="small" />
                  {t('logout')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="sm:hidden bg-[var(--md-surface-container)] border-b border-[var(--md-outline-variant)] safe-area-top">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href={role === 'admin' ? '/admin' : '/student'} className="flex items-center gap-2">
            <Icon name="emoji_events" className="text-[var(--md-primary)]" />
            <span className="md-title-medium text-[var(--md-on-surface)]">
              Reward Tracker
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <LanguageSwitch />
            <form action="/api/logout" method="POST">
              <button
                type="submit"
                className="p-2 rounded-full text-[var(--md-error)] hover:bg-[var(--md-error)]/8 transition-colors touch-target flex items-center justify-center"
                aria-label={t('logout')}
              >
                <Icon name="logout" />
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[var(--md-surface-container)] border-t border-[var(--md-outline-variant)] z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {links.map((link) => {
            const isActive = pathname === link.href || 
              (link.href !== '/admin' && link.href !== '/student' && pathname.startsWith(link.href));
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-w-[64px] transition-colors touch-target
                  ${isActive 
                    ? 'text-[var(--md-on-secondary-container)]' 
                    : 'text-[var(--md-on-surface-variant)]'
                  }
                `}
              >
                <div className={`
                  flex items-center justify-center w-16 h-8 rounded-full transition-colors
                  ${isActive ? 'bg-[var(--md-secondary-container)]' : ''}
                `}>
                  <Icon name={link.icon} filled={isActive} />
                </div>
                <span className="md-label-small mt-1">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
