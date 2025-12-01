'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Icon } from '@/components/ui/icon';
import { formatRupiah } from '@/lib/utils/currency';
import { Deduction, User } from '@/lib/supabase/types';
import { DebtSettingsForm } from './debt-settings-form';
import { ApplyDeductionForm } from './apply-deduction-form';
import { useTranslation } from '@/lib/i18n';

interface StudentPageClientProps {
  student: User;
  adminId: string;
  stats: {
    totalDebt: number;
    totalEarnings: number;
    totalDeductions: number;
  };
  deductions: Deduction[];
  remaining: number;
  progress: number;
}

export function StudentPageClient({ student, adminId, stats, deductions, remaining, progress }: StudentPageClientProps) {
  const { t } = useTranslation('studentManagement');

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>

      {/* Student Profile */}
      <Card>
        <CardHeader>
          <CardTitle>{t('studentProfile')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--md-primary-container)] flex items-center justify-center">
                <Icon name="person" size="xlarge" className="text-[var(--md-on-primary-container)]" />
              </div>
              <div>
                <p className="md-title-large text-[var(--md-on-surface)]">{student.display_name}</p>
                <p className="md-body-medium text-[var(--md-on-surface-variant)]">{t('studentLabel')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>{t('financialSummary')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ProgressBar 
              value={progress} 
              label={t('repaymentProgress')} 
              size="large"
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">{t('totalDebt')}</p>
                <p className="md-title-medium text-[var(--md-on-surface)]">{formatRupiah(stats.totalDebt)}</p>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">{t('totalEarnings')}</p>
                <p className="md-title-medium text-[var(--md-primary)]">{formatRupiah(stats.totalEarnings)}</p>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">{t('totalDeductions')}</p>
                <p className="md-title-medium text-[var(--md-error)]">-{formatRupiah(stats.totalDeductions)}</p>
              </div>
              <div className="text-center p-3 sm:p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">{t('remainingDebt')}</p>
                <p className="md-title-medium text-[var(--md-on-surface)]">{formatRupiah(remaining)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <DebtSettingsForm userId={student.id} currentDebt={stats.totalDebt} />
        <ApplyDeductionForm 
          studentId={student.id} 
          adminId={adminId} 
          deductions={deductions}
        />
      </div>
    </div>
  );
}

export function NoStudentPageClient() {
  const { t } = useTranslation('studentManagement');

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
