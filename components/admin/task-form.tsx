'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createTask, updateTask } from '@/lib/actions/tasks';
import { Task, TaskCategory, RewardType } from '@/lib/supabase/types';
import { useTranslation } from '@/lib/i18n';

interface TaskFormProps {
  task?: Task;
  userId: string;
}

export function TaskForm({ task, userId }: TaskFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation('tasks');
  const { t: tCommon } = useTranslation('common');
  const { t: tCategories } = useTranslation('categories');
  const { t: tRewardTypes } = useTranslation('rewardTypes');
  
  const isEditing = !!task;

  const categoryOptions = [
    { value: 'daily_routine', label: tCategories('daily_routine') },
    { value: 'self_improvement', label: tCategories('self_improvement') },
    { value: 'household', label: tCategories('household') },
    { value: 'social_emotional', label: tCategories('social_emotional') },
  ];

  const rewardTypeOptions = [
    { value: 'per_completion', label: tRewardTypes('per_completion') },
    { value: 'per_unit', label: tRewardTypes('per_unit') },
    { value: 'streak_only', label: tRewardTypes('streak_only') },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as TaskCategory,
      reward_amount: parseInt(formData.get('reward_amount') as string, 10),
      reward_type: formData.get('reward_type') as RewardType,
      unit_label: formData.get('unit_label') as string,
      units_required: parseInt(formData.get('units_required') as string, 10) || 1,
      streak_days: parseInt(formData.get('streak_days') as string, 10) || undefined,
      streak_bonus: parseInt(formData.get('streak_bonus') as string, 10) || undefined,
    };

    let result;
    
    if (isEditing) {
      result = await updateTask({
        ...data,
        id: task.id,
        is_active: formData.get('is_active') === 'true',
      });
    } else {
      result = await createTask({
        ...data,
        created_by: userId,
      });
    }

    if (result.success) {
      router.push('/admin/tasks');
    } else {
      setError(result.error || tCommon('error'));
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? t('editTask') : t('addNewTask')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            label={t('taskName')}
            required
            defaultValue={task?.name}
            placeholder={t('taskNamePlaceholder')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              name="category"
              label={t('category')}
              options={categoryOptions}
              required
              defaultValue={task?.category || ''}
              placeholder={t('selectCategory')}
            />

            <Select
              name="reward_type"
              label={t('rewardType')}
              options={rewardTypeOptions}
              required
              defaultValue={task?.reward_type || ''}
              placeholder={t('selectType')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="reward_amount"
              type="number"
              label={t('rewardAmount')}
              required
              min={0}
              defaultValue={task?.reward_amount}
              placeholder="10000"
            />

            <Input
              name="unit_label"
              label={t('unitLabel')}
              defaultValue={task?.unit_label || ''}
              placeholder={t('unitLabelPlaceholder')}
            />
          </div>

          <Input
            name="units_required"
            type="number"
            label={t('unitsRequired')}
            min={1}
            defaultValue={task?.units_required || 1}
            helperText={t('unitsRequiredHelper')}
          />

          <Input
            name="description"
            label={t('description')}
            defaultValue={task?.description || ''}
            placeholder={t('descriptionPlaceholder')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="streak_days"
              type="number"
              label={t('streakDays')}
              min={1}
              defaultValue={task?.streak_days || ''}
              placeholder="7"
            />

            <Input
              name="streak_bonus"
              type="number"
              label={t('streakBonus')}
              min={0}
              defaultValue={task?.streak_bonus || ''}
              placeholder="50000"
            />
          </div>

          {isEditing && (
            <Select
              name="is_active"
              label={t('status')}
              options={[
                { value: 'true', label: tCommon('active') },
                { value: 'false', label: tCommon('inactive') },
              ]}
              defaultValue={task.is_active ? 'true' : 'false'}
            />
          )}

          {error && (
            <div className="p-3 rounded-lg bg-[var(--md-error-container)] text-[var(--md-on-error-container)] md-body-medium">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? tCommon('saving') : isEditing ? t('saveChanges') : t('addTask')}
            </Button>
            <Button 
              type="button" 
              variant="outlined"
              onClick={() => router.push('/admin/tasks')}
            >
              {tCommon('cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
