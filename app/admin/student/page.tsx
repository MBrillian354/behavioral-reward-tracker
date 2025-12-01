import { getStudentUser, getStudentStats } from '@/lib/actions/student';
import { getDeductions } from '@/lib/actions/deductions';
import { calculateRemainingDebt, calculateProgress } from '@/lib/utils/earnings';
import { requireRole } from '@/lib/actions/auth';
import { StudentPageClient, NoStudentPageClient } from './student-page-client';

export default async function AdminStudentPage() {
  const session = await requireRole('admin');
  const student = await getStudentUser();
  const deductions = await getDeductions(true);

  if (!student) {
    return <NoStudentPageClient />;
  }

  const stats = await getStudentStats(student.id);
  const remaining = calculateRemainingDebt(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);
  const progress = calculateProgress(stats.totalDebt, stats.totalEarnings, stats.totalDeductions);

  return (
    <StudentPageClient
      student={student}
      adminId={session.userId}
      stats={stats}
      deductions={deductions}
      remaining={remaining}
      progress={progress}
    />
  );
}
