'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">
          {t('greeting')}, {displayName}!
        </h1>
        <Icon name="waving_hand" className="text-amber-500" />
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
              <Button variant="filled" className="w-full h-20 touch-target" size="large">
                <div className="text-center flex flex-col items-center">
                  <Icon name="check_circle" size="large" className="mb-1" />
                  <span>{t('recordTask')}</span>
                </div>
              </Button>
            </Link>
            <Link href="/student/report">
              <Button variant="outlined" className="w-full h-20 touch-target" size="large">
                <div className="text-center flex flex-col items-center">
                  <Icon name="edit_note" size="large" className="mb-1" />
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
            <div className="w-12 h-12 mx-auto rounded-full bg-[var(--md-primary-container)] flex items-center justify-center mb-2">
              <Icon name="assignment" className="text-[var(--md-on-primary-container)]" />
            </div>
            <p className="md-title-large text-[var(--md-on-surface)]">{stats.activeTasks}</p>
            <p className="md-body-small text-[var(--md-on-surface-variant)]">{t('activeTasks')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-2">
              <Icon name="local_fire_department" className="text-amber-600" />
            </div>
            <p className="md-title-large text-[var(--md-on-surface)]">-</p>
            <p className="md-body-small text-[var(--md-on-surface-variant)]">{t('longestStreak')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
