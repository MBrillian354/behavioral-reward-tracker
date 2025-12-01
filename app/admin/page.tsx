import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/admin/stats-card';
import { getStudentUser, getStudentStats } from '@/lib/actions/student';
import { formatRupiah } from '@/lib/utils/currency';
import { calculateRemainingDebt, calculateProgress, calculateNetEarnings } from '@/lib/utils/earnings';

export default async function AdminDashboardPage() {
  const student = await getStudentUser();
  
  if (!student) {
    return (
      <div className="space-y-6">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Dasbor Admin</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              Belum ada siswa terdaftar. Silakan jalankan migration untuk menambahkan data awal.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = await getStudentStats(student.id);
  const remaining = calculateRemainingDebt(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);
  const progress = calculateProgress(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);
  const netEarnings = calculateNetEarnings(stats.totalEarnings, stats.totalDeductions);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Dasbor Admin</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Pendapatan"
          value={stats.totalEarnings}
          isCurrency
          icon="💰"
        />
        <StatsCard
          title="Total Potongan"
          value={stats.totalDeductions}
          isCurrency
          icon="📉"
        />
        <StatsCard
          title="Sisa Utang"
          value={remaining}
          isCurrency
          icon="🎯"
          subtitle={`${progress.toFixed(1)}% lunas`}
        />
        <StatsCard
          title="Tugas Aktif"
          value={stats.activeTasks}
          icon="📋"
        />
      </div>

      {/* This Week Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Minggu Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="md-body-large text-[var(--md-on-surface-variant)]">Pendapatan</span>
                <span className="md-title-medium text-[var(--md-primary)]">
                  {formatRupiah(stats.thisWeekEarnings)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="md-body-large text-[var(--md-on-surface-variant)]">Potongan</span>
                <span className="md-title-medium text-[var(--md-error)]">
                  -{formatRupiah(stats.thisWeekDeductions)}
                </span>
              </div>
              <div className="pt-2 border-t border-[var(--md-outline-variant)]">
                <div className="flex justify-between items-center">
                  <span className="md-title-medium text-[var(--md-on-surface)]">Bersih</span>
                  <span className="md-title-large text-[var(--md-on-surface)]">
                    {formatRupiah(stats.thisWeekEarnings - stats.thisWeekDeductions)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/tasks/new">
                <Button variant="tonal" className="w-full">
                  + Tugas Baru
                </Button>
              </Link>
              <Link href="/admin/deductions/new">
                <Button variant="tonal" className="w-full">
                  + Deduksi Baru
                </Button>
              </Link>
              <Link href="/admin/student">
                <Button variant="outlined" className="w-full">
                  Kelola Siswa
                </Button>
              </Link>
              <Link href="/admin/logs">
                <Button variant="outlined" className="w-full">
                  Lihat Riwayat
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Pelunasan Utang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="w-full bg-[var(--md-surface-container-highest)] rounded-full h-6 overflow-hidden">
              <div
                className="h-full bg-[var(--md-primary)] rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${Math.max(progress, 5)}%` }}
              >
                <span className="text-xs font-medium text-[var(--md-on-primary)]">
                  {progress.toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex justify-between md-body-medium text-[var(--md-on-surface-variant)]">
              <span>Terbayar: {formatRupiah(netEarnings > 0 ? netEarnings : 0)}</span>
              <span>Sisa: {formatRupiah(remaining)}</span>
              <span>Total: {formatRupiah(stats.totalDebt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
