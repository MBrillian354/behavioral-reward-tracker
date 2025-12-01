import { getStudentUser, getStudentStats } from '@/lib/actions/student';
import { calculateRemainingDebt, calculateProgress, calculateNetEarnings } from '@/lib/utils/earnings';
import { AdminDashboardClient, NoStudentClient } from './admin-dashboard-client';

export default async function AdminDashboardPage() {
  const student = await getStudentUser();
  
  if (!student) {
    return <NoStudentClient />;
  }

  const stats = await getStudentStats(student.id);
  const remaining = calculateRemainingDebt(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);
  const progress = calculateProgress(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);
  const netEarnings = calculateNetEarnings(stats.totalEarnings, stats.totalDeductions);

  return (
    <AdminDashboardClient 
      stats={stats}
      remaining={remaining}
      progress={progress}
      netEarnings={netEarnings}
    />
  );
}
