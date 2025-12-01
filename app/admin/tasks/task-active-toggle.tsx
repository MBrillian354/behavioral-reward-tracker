'use client';

import { useState } from 'react';
import { Task } from '@/lib/supabase/types';
import { toggleTaskActive } from '@/lib/actions/tasks';
import { Badge } from '@/components/ui/badge';

interface TaskActiveToggleProps {
  task: Task;
}

export function TaskActiveToggle({ task }: TaskActiveToggleProps) {
  const [isActive, setIsActive] = useState(task.is_active);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const result = await toggleTaskActive(task.id, !isActive);
    
    if (result.success) {
      setIsActive(!isActive);
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Badge variant={isActive ? 'success' : 'default'} size="small">
        {loading ? '...' : isActive ? 'Aktif' : 'Nonaktif'}
      </Badge>
    </button>
  );
}
