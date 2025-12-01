'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { formatRupiah } from '@/lib/utils/currency';
import { calculateRemainingDebt, calculateProgress, calculateNetEarnings } from '@/lib/utils/earnings';
import { useTranslation } from '@/lib/i18n';

interface DebtProgressCardProps {
  totalDebt: number;
  totalEarnings: number;
  totalDeductions: number;
}

export function DebtProgressCard({ totalDebt, totalEarnings, totalDeductions }: DebtProgressCardProps) {
  const remaining = calculateRemainingDebt(totalDebt, totalEarnings, totalDeductions);
  const progress = calculateProgress(totalDebt, totalEarnings, totalDeductions);
  const netEarnings = calculateNetEarnings(totalEarnings, totalDeductions);
  const paid = netEarnings > 0 ? netEarnings : 0;
  const { t } = useTranslation('debtProgress');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="track_changes" className="text-[var(--md-primary)]" />
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-[var(--md-surface-container-highest)] rounded-full h-8 overflow-hidden">
              <div
                className="h-full bg-[var(--md-primary)] rounded-full transition-all duration-500 flex items-center justify-end"
                style={{ width: `${Math.max(progress, 8)}%` }}
              >
                <span className="text-sm font-bold text-[var(--md-on-primary)] px-3">
                  {progress.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="p-2 sm:p-3 rounded-lg bg-[var(--md-primary-container)]">
              <p className="md-label-small text-[var(--md-on-primary-container)]">{t('paid')}</p>
              <p className="md-title-small text-[var(--md-on-primary-container)]">{formatRupiah(paid)}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-[var(--md-surface-container)]">
              <p className="md-label-small text-[var(--md-on-surface-variant)]">{t('remaining')}</p>
              <p className="md-title-small text-[var(--md-on-surface)]">{formatRupiah(remaining)}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-[var(--md-surface-container)]">
              <p className="md-label-small text-[var(--md-on-surface-variant)]">{t('total')}</p>
              <p className="md-title-small text-[var(--md-on-surface)]">{formatRupiah(totalDebt)}</p>
            </div>
          </div>

          {/* Motivational message */}
          {progress >= 100 ? (
            <div className="p-4 rounded-lg bg-[var(--md-primary-container)] text-center flex items-center justify-center gap-2">
              <Icon name="celebration" className="text-[var(--md-on-primary-container)]" />
              <p className="md-title-medium text-[var(--md-on-primary-container)]">
                {t('congratulations')}
              </p>
            </div>
          ) : progress >= 75 ? (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center flex items-center justify-center gap-2">
              <Icon name="fitness_center" size="small" />
              {t('almostDone')}
            </p>
          ) : progress >= 50 ? (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center flex items-center justify-center gap-2">
              <Icon name="star" size="small" />
              {t('halfwayThere')}
            </p>
          ) : progress >= 25 ? (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center flex items-center justify-center gap-2">
              <Icon name="rocket_launch" size="small" />
              {t('goodProgress')}
            </p>
          ) : (
            <p className="md-body-medium text-[var(--md-on-surface-variant)] text-center flex items-center justify-center gap-2">
              <Icon name="auto_awesome" size="small" />
              {t('startSmall')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
