'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Deduction } from '@/lib/supabase/types';
import { formatRupiah } from '@/lib/utils/currency';
import { createDeductionLog } from '@/lib/actions/logs';
import { toDateString } from '@/lib/utils/dates';
import { useTranslation } from '@/lib/i18n';

interface SelfReportFormProps {
  deductions: Deduction[];
  userId: string;
}

export function SelfReportForm({ deductions, userId }: SelfReportFormProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('selfReport');
  const { t: tCommon } = useTranslation('common');

  const selectedDeduction = deductions.find((d) => d.id === selectedId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!selectedDeduction) {
      setError(t('selectFirst'));
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    const result = await createDeductionLog({
      user_id: userId,
      deduction_id: selectedDeduction.id,
      date: toDateString(new Date()),
      amount: selectedDeduction.amount,
      reason: notes || selectedDeduction.name,
      reported_by: userId, // Self-reported
    });

    if (result.success) {
      setSuccess(true);
      setSelectedId(null);
      setNotes('');
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || tCommon('error'));
    }

    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('selectMistakeType')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Deduction Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deductions.map((deduction) => (
              <button
                key={deduction.id}
                type="button"
                onClick={() => setSelectedId(deduction.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedId === deduction.id
                    ? 'bg-[var(--md-error-container)] border-[var(--md-error)]'
                    : 'bg-[var(--md-surface-container)] border-[var(--md-outline-variant)] hover:bg-[var(--md-surface-container-high)]'
                }`}
              >
                <p className={`md-title-small ${selectedId === deduction.id ? 'text-[var(--md-on-error-container)]' : 'text-[var(--md-on-surface)]'}`}>
                  {deduction.name}
                </p>
                {deduction.description && (
                  <p className="md-body-small text-[var(--md-on-surface-variant)] mt-1">
                    {deduction.description}
                  </p>
                )}
                <p className={`md-label-medium mt-2 ${selectedId === deduction.id ? 'text-[var(--md-on-error-container)]' : 'text-[var(--md-error)]'}`}>
                  -{formatRupiah(deduction.amount)}
                </p>
              </button>
            ))}
          </div>

          {/* Notes */}
          {selectedId && (
            <Input
              name="notes"
              label={t('notesOptional')}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('notesPlaceholder')}
            />
          )}

          {/* Selected Summary */}
          {selectedDeduction && (
            <div className="p-4 rounded-lg bg-[var(--md-error-container)]">
              <p className="md-body-medium text-[var(--md-on-error-container)]">
                {t('willReport')}: <strong>{selectedDeduction.name}</strong>
              </p>
              <p className="md-title-medium text-[var(--md-on-error-container)] mt-1">
                {t('deductionAmount')}: -{formatRupiah(selectedDeduction.amount)}
              </p>
            </div>
          )}

          {/* Success/Error Messages */}
          {success && (
            <div className="p-4 rounded-lg bg-[var(--md-primary-container)] text-center">
              <p className="md-title-medium text-[var(--md-on-primary-container)]">
                {t('reportSent')}
              </p>
              <p className="md-body-small text-[var(--md-on-primary-container)] mt-1">
                {t('thankYou')}
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={!selectedId || loading}
            className="w-full"
          >
            {loading ? t('sending') : t('sendReport')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
