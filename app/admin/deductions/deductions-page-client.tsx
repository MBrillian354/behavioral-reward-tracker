'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils/currency';
import { Deduction } from '@/lib/supabase/types';
import { DeductionActiveToggle } from './deduction-active-toggle';
import { useTranslation } from '@/lib/i18n';

interface DeductionsPageClientProps {
  deductions: Deduction[];
}

export function DeductionsPageClient({ deductions }: DeductionsPageClientProps) {
  const { t } = useTranslation('deductionsPage');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
        <Link href="/admin/deductions/new">
          <Button>{t('addDeduction')}</Button>
        </Link>
      </div>

      {deductions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              {t('noDeductions')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('description')}</TableHead>
              <TableHead align="right">{t('amount')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deductions.map((deduction) => (
              <TableRow key={deduction.id}>
                <TableCell>
                  <p className="font-medium">{deduction.name}</p>
                </TableCell>
                <TableCell>
                  <span className="md-body-small text-[var(--md-on-surface-variant)]">
                    {deduction.description || '-'}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span className="text-[var(--md-error)]">
                    -{formatRupiah(deduction.amount)}
                  </span>
                </TableCell>
                <TableCell>
                  <DeductionActiveToggle deduction={deduction} />
                </TableCell>
                <TableCell>
                  <Link href={`/admin/deductions/${deduction.id}/edit`}>
                    <Button variant="text" size="small">
                      {tCommon('edit')}
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
