'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createTask, updateTask } from '@/lib/actions/tasks';
import { Task, TaskCategory, RewardType, categoryLabels, rewardTypeLabels } from '@/lib/supabase/types';

interface TaskFormProps {
  task?: Task;
  userId: string;
}

export function TaskForm({ task, userId }: TaskFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditing = !!task;

  const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({
    value,
    label,
  }));

  const rewardTypeOptions = Object.entries(rewardTypeLabels).map(([value, label]) => ({
    value,
    label,
  }));

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
      setError(result.error || 'Terjadi kesalahan');
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Tugas' : 'Tambah Tugas Baru'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            label="Nama Tugas"
            required
            defaultValue={task?.name}
            placeholder="Contoh: Membersihkan kamar"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              name="category"
              label="Kategori"
              options={categoryOptions}
              required
              defaultValue={task?.category || ''}
              placeholder="Pilih kategori"
            />

            <Select
              name="reward_type"
              label="Tipe Reward"
              options={rewardTypeOptions}
              required
              defaultValue={task?.reward_type || ''}
              placeholder="Pilih tipe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="reward_amount"
              type="number"
              label="Jumlah Reward (Rp)"
              required
              min={0}
              defaultValue={task?.reward_amount}
              placeholder="10000"
            />

            <Input
              name="unit_label"
              label="Label Unit (opsional)"
              defaultValue={task?.unit_label || ''}
              placeholder="Contoh: halaman, menit"
            />
          </div>

          <Input
            name="units_required"
            type="number"
            label="Unit Dibutuhkan untuk 1 Reward"
            min={1}
            defaultValue={task?.units_required || 1}
            helperText="Contoh: 10 halaman = 1 reward"
          />

          <Input
            name="description"
            label="Deskripsi (opsional)"
            defaultValue={task?.description || ''}
            placeholder="Deskripsi tugas..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="streak_days"
              type="number"
              label="Hari untuk Bonus Streak (opsional)"
              min={1}
              defaultValue={task?.streak_days || ''}
              placeholder="7"
            />

            <Input
              name="streak_bonus"
              type="number"
              label="Bonus Streak (Rp) (opsional)"
              min={0}
              defaultValue={task?.streak_bonus || ''}
              placeholder="50000"
            />
          </div>

          {isEditing && (
            <Select
              name="is_active"
              label="Status"
              options={[
                { value: 'true', label: 'Aktif' },
                { value: 'false', label: 'Tidak Aktif' },
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
              {loading ? 'Menyimpan...' : isEditing ? 'Simpan Perubahan' : 'Tambah Tugas'}
            </Button>
            <Button 
              type="button" 
              variant="outlined"
              onClick={() => router.push('/admin/tasks')}
            >
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
