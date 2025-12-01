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
      setError('Pilih deduksi terlebih dahulu');
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
      setError(result.error || 'Terjadi kesalahan');
    }
    setLoading(false);
  }

  const deductionOptions = [
    ...deductions.map(d => ({
      value: d.id,
      label: `${d.name} (-${formatRupiah(d.amount)})`,
    })),
    { value: 'custom', label: 'Jumlah Kustom' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Terapkan Deduksi</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            name="deduction_id"
            label="Pilih Deduksi"
            options={deductionOptions}
            required
            value={selectedDeduction}
            onChange={(e) => setSelectedDeduction(e.target.value)}
            placeholder="Pilih deduksi..."
          />

          {selectedDeduction === 'custom' && (
            <Input
              name="custom_amount"
              type="number"
              label="Jumlah Kustom (Rp)"
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
            label="Tanggal"
            required
            defaultValue={toDateString(new Date())}
          />

          <Input
            name="reason"
            label="Alasan"
            required
            placeholder="Alasan deduksi..."
          />

          {success && (
            <div className="p-3 rounded-lg bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] md-body-medium">
              Deduksi berhasil diterapkan!
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Menerapkan...' : 'Terapkan Deduksi'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
