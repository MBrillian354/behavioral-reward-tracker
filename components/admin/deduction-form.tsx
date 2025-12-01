'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createDeduction, updateDeduction } from '@/lib/actions/deductions';
import { Deduction } from '@/lib/supabase/types';

interface DeductionFormProps {
  deduction?: Deduction;
  userId: string;
}

export function DeductionForm({ deduction, userId }: DeductionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditing = !!deduction;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      amount: parseInt(formData.get('amount') as string, 10),
    };

    let result;
    
    if (isEditing) {
      result = await updateDeduction({
        ...data,
        id: deduction.id,
        is_active: formData.get('is_active') === 'true',
      });
    } else {
      result = await createDeduction({
        ...data,
        created_by: userId,
      });
    }

    if (result.success) {
      router.push('/admin/deductions');
    } else {
      setError(result.error || 'Terjadi kesalahan');
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Deduksi' : 'Tambah Deduksi Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            label="Nama Deduksi"
            required
            defaultValue={deduction?.name}
            placeholder="Contoh: Berbohong"
          />

          <Input
            name="amount"
            type="number"
            label="Jumlah Potongan (Rp)"
            required
            min={0}
            defaultValue={deduction?.amount}
            placeholder="50000"
          />

          <Input
            name="description"
            label="Deskripsi (opsional)"
            defaultValue={deduction?.description || ''}
            placeholder="Deskripsi deduksi..."
          />

          {isEditing && (
            <Select
              name="is_active"
              label="Status"
              options={[
                { value: 'true', label: 'Aktif' },
                { value: 'false', label: 'Tidak Aktif' },
              ]}
              defaultValue={deduction.is_active ? 'true' : 'false'}
            />
          )}

          {error && (
            <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Deduksi'}
            </Button>
            <Button 
              type="button" 
              variant="outlined"
              onClick={() => router.push('/admin/deductions')}
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
