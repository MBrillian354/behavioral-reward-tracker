import { getTasks } from '@/lib/actions/tasks';
import { TasksPageClient } from './tasks-page-client';

export default async function AdminTasksPage() {
  const tasks = await getTasks();

  return <TasksPageClient tasks={tasks} />;
}
