'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils/currency';
import { Task } from '@/lib/supabase/types';
import { TaskActiveToggle } from './task-active-toggle';
import { useTranslation } from '@/lib/i18n';

interface TasksPageClientProps {
  tasks: Task[];
}

export function TasksPageClient({ tasks }: TasksPageClientProps) {
  const { t } = useTranslation('tasks');
  const { t: tCategories } = useTranslation('categories');
  const { t: tRewardTypes } = useTranslation('rewardTypes');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md-headline-large text-[var(--md-on-surface)]">{t('title')}</h1>
        <Link href="/admin/tasks/new">
          <Button>{t('addTask')}</Button>
        </Link>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="md-body-large text-[var(--md-on-surface-variant)]">
              {t('noTasks')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('category')}</TableHead>
              <TableHead>{t('type')}</TableHead>
              <TableHead align="right">{t('reward')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead>{t('streak')}</TableHead>
              <TableHead>{t('action')}</TableHead>
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
                    {tCategories(task.category as 'daily_routine' | 'self_improvement' | 'household' | 'social_emotional')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="md-body-small">
                    {tRewardTypes(task.reward_type as 'per_completion' | 'per_unit' | 'streak_only')}
                  </span>
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
                      {task.streak_days} {tCommon('days')} → {formatRupiah(task.streak_bonus || 0)}
                    </span>
                  ) : (
                    <span className="md-body-small text-[var(--md-on-surface-variant)]">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Link href={`/admin/tasks/${task.id}/edit`}>
                    <Button variant="text" size="small">
                      {tCommon('edit')}
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
