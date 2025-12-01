'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DebtProgressCard } from '@/components/student/debt-progress-card';
import { EarningsSummary } from '@/components/student/earnings-summary';
import { useTranslation } from '@/lib/i18n';

interface StudentDashboardClientProps {
  displayName: string;
  stats: {
    totalDebt: number;
    totalEarnings: number;
    totalDeductions: number;
    thisWeekEarnings: number;
    thisWeekDeductions: number;
    activeTasks: number;
  };
}

export function StudentDashboardClient({ displayName, stats }: StudentDashboardClientProps) {
  const { t } = useTranslation('studentDashboard');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">
          {t('greeting')}, {displayName}! 👋
        </h1>
      </div>

      {/* Debt Progress */}
      <DebtProgressCard 
        totalDebt={stats.totalDebt}
        totalEarnings={stats.totalEarnings}
        totalDeductions={stats.totalDeductions}
      />

      {/* Earnings Summary */}
      <EarningsSummary 
        totalEarnings={stats.totalEarnings}
        totalDeductions={stats.totalDeductions}
        thisWeekEarnings={stats.thisWeekEarnings}
        thisWeekDeductions={stats.thisWeekDeductions}
      />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/student/tracker">
              <Button variant="filled" className="w-full h-20" size="large">
                <div className="text-center">
                  <span className="text-2xl block mb-1">✅</span>
                  <span>{t('recordTask')}</span>
                </div>
              </Button>
            </Link>
            <Link href="/student/report">
              <Button variant="outlined" className="w-full h-20" size="large">
                <div className="text-center">
                  <span className="text-2xl block mb-1">📝</span>
                  <span>{t('reportMistake')}</span>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <span className="text-3xl">📋</span>
            <p className="md-title-large text-[var(--md-on-surface)] mt-2">{stats.activeTasks}</p>
            <p className="md-body-small text-[var(--md-on-surface-variant)]">{t('activeTasks')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <span className="text-3xl">🔥</span>
            <p className="md-title-large text-[var(--md-on-surface)] mt-2">-</p>
            <p className="md-body-small text-[var(--md-on-surface-variant)]">{t('longestStreak')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
