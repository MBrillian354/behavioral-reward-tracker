'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils/currency';
import { useTranslation } from '@/lib/i18n';

interface EarningsSummaryProps {
  totalEarnings: number;
  totalDeductions: number;
  thisWeekEarnings: number;
  thisWeekDeductions: number;
}

export function EarningsSummary({ 
  totalEarnings, 
  totalDeductions, 
  thisWeekEarnings, 
  thisWeekDeductions 
}: EarningsSummaryProps) {
  const { t } = useTranslation('earningsSummary');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💰 {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* This Week */}
          <div className="p-4 rounded-lg bg-[var(--md-surface-container)]">
            <p className="md-label-medium text-[var(--md-on-surface-variant)] mb-2">{t('thisWeek')}</p>
            <div className="flex justify-between items-center">
              <span className="md-body-medium">{t('earnings')}</span>
              <span className="md-title-medium text-[var(--md-primary)]">+{formatRupiah(thisWeekEarnings)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="md-body-medium">{t('deductions')}</span>
              <span className="md-title-medium text-[var(--md-error)]">-{formatRupiah(thisWeekDeductions)}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-[var(--md-outline-variant)]">
              <div className="flex justify-between items-center">
                <span className="md-title-small">{t('net')}</span>
                <span className="md-title-large text-[var(--md-on-surface)]">
                  {formatRupiah(thisWeekEarnings - thisWeekDeductions)}
                </span>
              </div>
            </div>
          </div>

          {/* All Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[var(--md-primary-container)] text-center">
              <p className="md-label-small text-[var(--md-on-primary-container)]">{t('totalEarnings')}</p>
              <p className="md-title-medium text-[var(--md-on-primary-container)]">{formatRupiah(totalEarnings)}</p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-center">
              <p className="md-label-small text-[var(--md-on-error-container)]">{t('totalDeductions')}</p>
              <p className="md-title-medium text-[var(--md-on-error-container)]">{formatRupiah(totalDeductions)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
