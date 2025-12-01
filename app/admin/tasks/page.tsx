import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { getTasks } from '@/lib/actions/tasks';
import { formatRupiah } from '@/lib/utils/currency';
import { categoryLabels, rewardTypeLabels } from '@/lib/supabase/types';
import { TaskActiveToggle } from './task-active-toggle';

export default async function AdminTasksPage() {
  const tasks = await getTasks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">Kelola Tugas</h1>
        <Link href="/admin/tasks/new">
          <Button>+ Tambah Tugas</Button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              Belum ada tugas. Klik tombol di atas untuk menambah tugas baru.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead align="right">Reward</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Streak</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{task.name}</p>
                    {task.description && (
                      <p className="md-body-small text-[var(--md-on-surface-variant)]">
                        {task.description}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="info" size="small">
                    {categoryLabels[task.category]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="md-body-small">{rewardTypeLabels[task.reward_type]}</span>
                  {task.unit_label && (
                    <span className="md-body-small text-[var(--md-on-surface-variant)]">
                      {' '}({task.units_required} {task.unit_label})
                    </span>
                  )}
                </TableCell>
                <TableCell align="right">
                  {formatRupiah(task.reward_amount)}
                </TableCell>
                <TableCell>
                  <TaskActiveToggle task={task} />
                </TableCell>
                <TableCell>
                  {task.streak_days ? (
                    <span className="md-body-small">
                      {task.streak_days} hari → {formatRupiah(task.streak_bonus || 0)}
                    </span>
                  ) : (
                    <span className="md-body-small text-[var(--md-on-surface-variant)]">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/tasks/${task.id}/edit`}>
                    <Button variant="text" size="small">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
