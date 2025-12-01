import { getStudentUser } from '@/lib/actions/student';
import { getTaskLogs, getDeductionLogs } from '@/lib/actions/logs';
import { LogsPageClient, NoStudentLogsClient } from './logs-page-client';

export default async function AdminLogsPage() {
  const student = await getStudentUser();

  if (!student) {
    return <NoStudentLogsClient />;
  }

  const taskLogs = await getTaskLogs(student.id);
  const deductionLogs = await getDeductionLogs(student.id);

  return <LogsPageClient taskLogs={taskLogs} deductionLogs={deductionLogs} />;
}
