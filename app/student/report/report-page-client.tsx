'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { SelfReportForm } from './self-report-form';
import { Deduction } from '@/lib/supabase/types';
import { useTranslation } from '@/lib/i18n';

interface ReportPageClientProps {
  deductions: Deduction[];
  userId: string;
}

export function ReportPageClient({ deductions, userId }: ReportPageClientProps) {
  const { t } = useTranslation('selfReport');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
        <p className="md-body-medium text-[var(--md-on-surface-variant)] mt-2">
          {t('subtitle')}
        </p>
      </div>

      {/* Encouragement Card */}
      <Card variant="filled">
        <CardContent className="py-4 text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-amber-100 flex items-center justify-center">
            <Icon name="star" size="xlarge" className="text-amber-600" />
          </div>
          <p className="md-title-medium text-[var(--md-on-surface)]">
            {t('encouragement')}
          </p>
          <p className="md-body-small text-[var(--md-on-surface-variant)] mt-1">
            {t('encouragementSubtitle')}
          </p>
        </CardContent>
      </Card>

      {deductions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              {t('noDeductions')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <SelfReportForm deductions={deductions} userId={userId} />
      )}
    </div>
  );
}
