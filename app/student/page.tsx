import { requireRole } from '@/lib/actions/auth';
import { getStudentStats } from '@/lib/actions/student';
import { StudentDashboardClient } from './student-dashboard-client';

export default async function StudentDashboardPage() {
  const session = await requireRole('student');
  const stats = await getStudentStats(session.userId);

  return (
    <StudentDashboardClient 
      displayName={session.displayName}
      stats={stats}
    />
  );
}
