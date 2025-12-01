'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createDeduction, updateDeduction } from '@/lib/actions/deductions';
import { Deduction } from '@/lib/supabase/types';
import { useTranslation } from '@/lib/i18n';

interface DeductionFormProps {
  deduction?: Deduction;
  userId: string;
}

export function DeductionForm({ deduction, userId }: DeductionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('deductionsPage');
  const { t: tCommon } = useTranslation('common');
  
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
      setError(result.error || tCommon('error'));
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? t('editDeduction') : t('addNewDeduction')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            label={t('deductionName')}
            required
            defaultValue={deduction?.name}
            placeholder={t('deductionNamePlaceholder')}
          />

          <Input
            name="amount"
            type="number"
            label={t('deductionAmount')}
            required
            min={0}
            defaultValue={deduction?.amount}
            placeholder="50000"
          />

          <Input
            name="description"
            label={t('descriptionOptional')}
            defaultValue={deduction?.description || ''}
            placeholder={t('descriptionPlaceholder')}
          />

          {isEditing && (
            <Select
              name="is_active"
              label={t('status')}
              options={[
                { value: 'true', label: tCommon('active') },
                { value: 'false', label: tCommon('inactive') },
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
              {loading ? tCommon('saving') : isEditing ? t('saveChanges') : t('addDeduction')}
            </Button>
            <Button 
              type="button" 
              variant="outlined"
              onClick={() => router.push('/admin/deductions')}
            >
              {tCommon('cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
