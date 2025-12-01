import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { getDeductions } from '@/lib/actions/deductions';
import { formatRupiah } from '@/lib/utils/currency';
import { DeductionActiveToggle } from './deduction-active-toggle';

export default async function AdminDeductionsPage() {
  const deductions = await getDeductions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Kelola Deduksi</h1>
        <Link href="/admin/deductions/new">
          <Button>+ Tambah Deduksi</Button>
        </Link>
      </div>

      {deductions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              Belum ada deduksi. Klik tombol di atas untuk menambah deduksi baru.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead align="right">Potongan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
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
                      Edit
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
