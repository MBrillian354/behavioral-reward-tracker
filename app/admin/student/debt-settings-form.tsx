'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { updateDebtSettings } from '@/lib/actions/student';
import { formatRupiah } from '@/lib/utils/currency';

interface DebtSettingsFormProps {
  userId: string;
  currentDebt: number;
}

export function DebtSettingsForm({ userId, currentDebt }: DebtSettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const amount = parseInt(formData.get('total_debt') as string, 10);

    const result = await updateDebtSettings(userId, amount);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Terjadi kesalahan');
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Utang</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="total_debt"
            type="number"
            label="Total Utang (Rp)"
            required
            min={0}
            defaultValue={currentDebt}
            placeholder="1000000"
          />

          <p className="md-body-small text-[var(--md-on-surface-variant)]">
            Saat ini: {formatRupiah(currentDebt)}
          </p>

          {success && (
            <div className="p-3 rounded-lg bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)] md-body-medium">
              Berhasil memperbarui pengaturan utang!
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium">
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Perbarui Utang'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
