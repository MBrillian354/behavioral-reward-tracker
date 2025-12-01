import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { getStudentUser, getStudentStats } from '@/lib/actions/student';
import { getDeductions } from '@/lib/actions/deductions';
import { formatRupiah } from '@/lib/utils/currency';
import { calculateRemainingDebt, calculateProgress } from '@/lib/utils/earnings';
import { requireRole } from '@/lib/actions/auth';
import { DebtSettingsForm } from './debt-settings-form';
import { ApplyDeductionForm } from './apply-deduction-form';

export default async function AdminStudentPage() {
  const session = await requireRole('admin');
  const student = await getStudentUser();
  const deductions = await getDeductions(true);

  if (!student) {
    return (
      <div className="space-y-6">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Kelola Siswa</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              Belum ada siswa terdaftar.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = await getStudentStats(student.id);
  const remaining = calculateRemainingDebt(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);
  const progress = calculateProgress(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);

  return (
    <div className="space-y-6">
      <h1 className="md-headline-large text-[var(--md-on-surface)]">Kelola Siswa</h1>

      {/* Student Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profil Siswa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[var(--md-primary-container)] flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="md-title-large text-[var(--md-on-surface)]">{student.display_name}</p>
                <p className="md-body-medium text-[var(--md-on-surface-variant)]">Siswa</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Keuangan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ProgressBar 
              value={progress} 
              label="Progress Pelunasan" 
              size="large"
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">Total Utang</p>
                <p className="md-title-medium text-[var(--md-on-surface)]">{formatRupiah(stats.totalDebt)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">Total Pendapatan</p>
                <p className="md-title-medium text-[var(--md-primary)]">{formatRupiah(stats.totalEarnings)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">Total Potongan</p>
                <p className="md-title-medium text-[var(--md-error)]">-{formatRupiah(stats.totalDeductions)}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-[var(--md-surface-container)]">
                <p className="md-label-medium text-[var(--md-on-surface-variant)]">Sisa Utang</p>
                <p className="md-title-medium text-[var(--md-on-surface)]">{formatRupiah(remaining)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DebtSettingsForm userId={student.id} currentDebt={stats.totalDebt} />
        <ApplyDeductionForm 
          studentId={student.id} 
          adminId={session.userId} 
          deductions={deductions}
        />
      </div>
    </div>
  );
}
