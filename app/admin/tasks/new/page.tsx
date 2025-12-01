import { requireRole } from '@/lib/actions/auth';
import { TaskForm } from '@/components/admin/task-form';

export default async function NewTaskPage() {
  const session = await requireRole('admin');

  return (
    <div className="max-w-2xl mx-auto">
      <TaskForm userId={session.userId} />
    </div>
  );
}
