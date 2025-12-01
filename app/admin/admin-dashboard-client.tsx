'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { StatsCard } from '@/components/admin/stats-card';
import { formatRupiah } from '@/lib/utils/currency';
import { useTranslation } from '@/lib/i18n';

interface AdminDashboardClientProps {
  stats: {
    totalEarnings: number;
    totalDeductions: number;
    totalDebt: number;
    activeTasks: number;
    thisWeekEarnings: number;
    thisWeekDeductions: number;
  };
  remaining: number;
  progress: number;
  netEarnings: number;
}

export function AdminDashboardClient({ stats, remaining, progress, netEarnings }: AdminDashboardClientProps) {
  const { t } = useTranslation('adminDashboard');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title={t('totalEarnings')}
          value={stats.totalEarnings}
          isCurrency
          icon="savings"
        />
        <StatsCard
          title={t('totalDeductions')}
          value={stats.totalDeductions}
          isCurrency
          icon="trending_down"
        />
        <StatsCard
          title={t('remainingDebt')}
          value={remaining}
          isCurrency
          icon="track_changes"
          subtitle={`${progress.toFixed(1)}% ${t('paidOff')}`}
        />
        <StatsCard
          title={t('activeTasks')}
          value={stats.activeTasks}
          icon="assignment"
        />
      </div>

      {/* This Week Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('thisWeekSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="md-body-large text-[var(--md-on-surface-variant)]">{t('earnings')}</span>
                <span className="md-title-medium text-[var(--md-primary)]">
                  {formatRupiah(stats.thisWeekEarnings)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="md-body-large text-[var(--md-on-surface-variant)]">{t('deduction')}</span>
                <span className="md-title-medium text-[var(--md-error)]">
                  -{formatRupiah(stats.thisWeekDeductions)}
                </span>
              </div>
              <div className="pt-2 border-t border-[var(--md-outline-variant)]">
                <div className="flex justify-between items-center">
                  <span className="md-title-medium text-[var(--md-on-surface)]">{t('net')}</span>
                  <span className="md-title-large text-[var(--md-on-surface)]">
                    {formatRupiah(stats.thisWeekEarnings - stats.thisWeekDeductions)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('quickActions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/tasks/new">
                <Button variant="tonal" className="w-full flex items-center gap-2">
                  <Icon name="add" size="small" />
                  <span className="hidden sm:inline">{t('newTask')}</span>
                  <span className="sm:hidden">Task</span>
                </Button>
              </Link>
              <Link href="/admin/deductions/new">
                <Button variant="tonal" className="w-full flex items-center gap-2">
                  <Icon name="add" size="small" />
                  <span className="hidden sm:inline">{t('newDeduction')}</span>
                  <span className="sm:hidden">Deduksi</span>
                </Button>
              </Link>
              <Link href="/admin/student">
                <Button variant="outlined" className="w-full flex items-center gap-2">
                  <Icon name="person" size="small" />
                  <span className="hidden sm:inline">{t('manageStudent')}</span>
                  <span className="sm:hidden">Siswa</span>
                </Button>
              </Link>
              <Link href="/admin/logs">
                <Button variant="outlined" className="w-full flex items-center gap-2">
                  <Icon name="history" size="small" />
                  <span className="hidden sm:inline">{t('viewHistory')}</span>
                  <span className="sm:hidden">Riwayat</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('debtProgress')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-[var(--md-surface-container-highest)] rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-[var(--md-primary)] rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${Math.max(progress, 5)}%` }}
              >
                <span className="text-xs font-medium text-[var(--md-on-primary)]">
                  {progress.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between md-body-medium text-[var(--md-on-surface-variant)] gap-2">
              <span>{t('paid')}: {formatRupiah(netEarnings > 0 ? netEarnings : 0)}</span>
              <span>{t('remaining')}: {formatRupiah(remaining)}</span>
              <span>{t('total')}: {formatRupiah(stats.totalDebt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function NoStudentClient() {
  const { t } = useTranslation('adminDashboard');

  return (
    <div className="space-y-6">
      <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
      <Card>
        <CardContent className="py-8 text-center">
          <p className="md-body-large text-[var(--md-on-surface-variant)]">
            {t('noStudent')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
