import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { requireRole } from '@/lib/actions/auth';
import { getStudentStats } from '@/lib/actions/student';
import { DebtProgressCard } from '@/components/student/debt-progress-card';
import { EarningsSummary } from '@/components/student/earnings-summary';

export default async function StudentDashboardPage() {
  const session = await requireRole('student');
  const stats = await getStudentStats(session.userId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">
          Hai, {session.displayName}! 👋
        </h1>
      </div>

      {/* Debt Progress */}
      <DebtProgressCard 
        totalDebt={stats.totalDebt}
        totalEarnings={stats.totalEarnings}
        totalDeductions={stats.totalDeductions}
      />

      {/* Earnings Summary */}
      <EarningsSummary 
        totalEarnings={stats.totalEarnings}
        totalDeductions={stats.totalDeductions}
        thisWeekEarnings={stats.thisWeekEarnings}
        thisWeekDeductions={stats.thisWeekDeductions}
      />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/student/tracker">
              <Button variant="filled" className="w-full h-20" size="large">
                <div className="text-center">
                  <span className="text-2xl block mb-1">✅</span>
                  <span>Catat Tugas</span>
                </div>
              </Button>
            </Link>
            <Link href="/student/report">
              <Button variant="outlined" className="w-full h-20" size="large">
                <div className="text-center">
                  <span className="text-2xl block mb-1">📝</span>
                  <span>Lapor Kesalahan</span>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 text-center">
            <span className="text-3xl">📋</span>
            <p className="md-title-large text-[var(--md-on-surface)] mt-2">{stats.activeTasks}</p>
            <p className="md-body-small text-[var(--md-on-surface-variant)]">Tugas Aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <span className="text-3xl">🔥</span>
            <p className="md-title-large text-[var(--md-on-surface)] mt-2">-</p>
            <p className="md-body-small text-[var(--md-on-surface-variant)]">Streak Terpanjang</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
