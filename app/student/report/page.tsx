import { requireRole } from '@/lib/actions/auth';
import { getDeductions } from '@/lib/actions/deductions';
import { ReportPageClient } from './report-page-client';

export default async function StudentReportPage() {
  const session = await requireRole('student');
  const deductions = await getDeductions(true);

  return <ReportPageClient deductions={deductions} userId={session.userId} />;
}
