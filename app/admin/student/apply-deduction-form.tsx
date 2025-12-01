'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createDeductionLog } from '@/lib/actions/logs';
import { Deduction } from '@/lib/supabase/types';
import { formatRupiah } from '@/lib/utils/currency';
import { toDateString } from '@/lib/utils/dates';
import { useTranslation } from '@/lib/i18n';

interface ApplyDeductionFormProps {
  studentId: string;
  adminId: string;
  deductions: Deduction[];
}

export function ApplyDeductionForm({ studentId, adminId, deductions }: ApplyDeductionFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeduction, setSelectedDeduction] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const { t } = useTranslation('studentManagement');
  const { t: tCommon } = useTranslation('common');

  const selected = deductions.find(d => d.id === selectedDeduction);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const reason = formData.get('reason') as string;
    const date = formData.get('date') as string;
    
    let amount: number;
    
    if (selectedDeduction === 'custom') {
      amount = parseInt(customAmount, 10);
    } else if (selected) {
      amount = selected.amount;
    } else {
      setError(t('selectDeductionFirst'));
      setLoading(false);
      return;
    }

    const result = await createDeductionLog({
      user_id: studentId,
      deduction_id: selectedDeduction !== 'custom' ? selectedDeduction : undefined,
      date: date,
      amount: amount,
      reason: reason,
      reported_by: adminId,
    });

    if (result.success) {
      setSuccess(true);
      setSelectedDeduction('');
      setCustomAmount('');
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || tCommon('error'));
    }
    setLoading(false);
  }

  const deductionOptions = [
    ...deductions.map(d => ({
      value: d.id,
      label: `${d.name} (-${formatRupiah(d.amount)})`,
    })),
    { value: 'custom', label: t('customAmount') },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('applyDeduction')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            name="deduction_id"
            label={t('selectDeduction')}
            options={deductionOptions}
            required
            value={selectedDeduction}
            onChange={(e) => setSelectedDeduction(e.target.value)}
            placeholder={t('selectDeductionPlaceholder')}
          />

          {selectedDeduction === 'custom' && (
            <Input
              name="custom_amount"
              type="number"
              label={t('customAmountLabel')}
              required
              min={0}
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="50000"
            />
          )}

          <Input
            name="date"
            type="date"
            label={t('dateLabel')}
            required
            defaultValue={toDateString(new Date())}
          />

          <Input
            name="reason"
            label={t('reasonLabel')}
            required
            placeholder={t('reasonPlaceholder')}
          />

          {success && (
            <div className="p-3 rounded-lg bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] md-body-medium">
              {t('deductionApplied')}
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? t('applying') : t('apply')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
