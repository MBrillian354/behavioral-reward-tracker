'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { StreakBadge } from '@/components/shared/streak-badge';
import { Task, TaskLog } from '@/lib/supabase/types';
import { formatRupiah } from '@/lib/utils/currency';
import { createTaskLog } from '@/lib/actions/logs';
import { useTranslation } from '@/lib/i18n';

interface DailyChecklistProps {
  tasks: Task[];
  existingLogs: TaskLog[];
  userId: string;
  date: string;
  streaks: Record<string, number>;
}

interface TaskState {
  checked: boolean;
  quantity: number;
}

// Map categories to Material Icons
const categoryIcons: Record<string, string> = {
  daily_routine: 'wb_sunny',
  self_improvement: 'menu_book',
  household: 'home',
  social_emotional: 'favorite',
};

export function DailyChecklist({ tasks, existingLogs, userId, date, streaks }: DailyChecklistProps) {
  const [taskStates, setTaskStates] = useState<Record<string, TaskState>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const { t } = useTranslation('tracker');
  const { t: tCommon } = useTranslation('common');
  const { t: tCategories } = useTranslation('categories');

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // Initialize states from existing logs
  useEffect(() => {
    const states: Record<string, TaskState> = {};
    tasks.forEach((task) => {
      const log = existingLogs.find((l) => l.task_id === task.id);
      states[task.id] = {
        checked: !!log,
        quantity: log?.quantity || 1,
      };
    });
    setTaskStates(states);
  }, [tasks, existingLogs]);

  function calculateEarnings(task: Task, quantity: number): number {
    if (task.reward_type === 'per_completion') {
      return task.reward_amount;
    } else if (task.reward_type === 'per_unit') {
      const units = Math.floor(quantity / task.units_required);
      return units * task.reward_amount;
    }
    return 0;
  }

  async function handleTaskChange(task: Task, checked: boolean, quantity: number = 1) {
    if (!checked) {
      // If unchecked, we need to remove the log
      setTaskStates((prev) => ({
        ...prev,
        [task.id]: { checked: false, quantity: 1 },
      }));
      return;
    }

    setLoading(task.id);
    setSaved(null);

    const earned = calculateEarnings(task, quantity);

    const result = await createTaskLog({
      user_id: userId,
      task_id: task.id,
      date: date,
      quantity: quantity,
      earned_amount: earned,
    });

    if (result.success) {
      setTaskStates((prev) => ({
        ...prev,
        [task.id]: { checked: true, quantity },
      }));
      setSaved(task.id);
      setTimeout(() => setSaved(null), 2000);
    }

    setLoading(null);
  }

  // Calculate today's potential and earned amounts
  const todayEarned = tasks.reduce((sum, task) => {
    const state = taskStates[task.id];
    if (state?.checked) {
      return sum + calculateEarnings(task, state.quantity);
    }
    return sum;
  }, 0);

  // Get category label based on language
  const getCategoryLabel = (category: string) => {
    return tCategories(category as 'daily_routine' | 'self_improvement' | 'household' | 'social_emotional');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Today's Summary */}
      <Card variant="filled">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <span className="md-title-medium text-[var(--md-on-surface)]">{t('todayEarnings')}</span>
            <span className="md-headline-small text-[var(--md-primary)]">{formatRupiah(todayEarned)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Tasks by Category */}
      {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name={categoryIcons[category] || 'category'} className="text-[var(--md-primary)]" />
              {getCategoryLabel(category)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryTasks.map((task) => {
                const state = taskStates[task.id] || { checked: false, quantity: 1 };
                const isLoading = loading === task.id;
                const isSaved = saved === task.id;
                const streak = streaks[task.id] || 0;

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all ${
                      state.checked
                        ? 'bg-[var(--md-primary-container)] border-[var(--md-primary)]'
                        : 'bg-[var(--md-surface-container)] border-[var(--md-outline-variant)]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Checkbox */}
                      <label className="flex items-center cursor-pointer touch-target">
                        <input
                          type="checkbox"
                          checked={state.checked}
                          onChange={(e) => handleTaskChange(task, e.target.checked, state.quantity)}
                          disabled={isLoading}
                          className="w-6 h-6 rounded-md border-2 border-[var(--md-outline)] text-[var(--md-primary)] focus:ring-[var(--md-primary)] cursor-pointer"
                        />
                      </label>

                      {/* Task Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`md-title-small ${state.checked ? 'line-through opacity-70' : ''}`}>
                            {task.name}
                          </span>
                          {task.streak_days && (
                            <StreakBadge streak={streak} requiredDays={task.streak_days} />
                          )}
                          {isSaved && (
                            <Badge variant="success" size="small">
                              <Icon name="check" size="small" className="mr-1" />
                              {tCommon('saved')}
                            </Badge>
                          )}
                        </div>
                        
                        {task.description && (
                          <p className="md-body-small text-[var(--md-on-surface-variant)] mt-1">
                            {task.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="info" size="small">
                            {formatRupiah(task.reward_amount)}
                            {task.reward_type === 'per_unit' && ` / ${task.units_required} ${task.unit_label}`}
                          </Badge>
                          {task.streak_bonus && task.streak_days && (
                            <Badge variant="warning" size="small">
                              +{formatRupiah(task.streak_bonus)} @ {task.streak_days} {tCommon('days')}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Quantity Input for per_unit tasks */}
                      {task.reward_type === 'per_unit' && state.checked && (
                        <div className="flex flex-col items-end">
                          <input
                            type="number"
                            min={1}
                            value={state.quantity}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value, 10) || 1;
                              handleTaskChange(task, true, qty);
                            }}
                            className="w-20 px-2 py-1 rounded-lg border border-[var(--md-outline-variant)] text-center md-body-medium"
                          />
                          <span className="md-label-small text-[var(--md-on-surface-variant)] mt-1">
                            {task.unit_label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
