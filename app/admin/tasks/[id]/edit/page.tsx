import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/actions/auth';
import { getTask } from '@/lib/actions/tasks';
import { TaskForm } from '@/components/admin/task-form';

interface EditTaskPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;
  const session = await requireRole('admin');
  const task = await getTask(id);

  if (!task) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <TaskForm task={task} userId={session.userId} />
    </div>
  );
}
