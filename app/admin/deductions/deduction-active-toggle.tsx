'use client';

import { useState } from 'react';
import { Deduction } from '@/lib/supabase/types';
import { toggleDeductionActive } from '@/lib/actions/deductions';
import { Badge } from '@/components/ui/badge';

interface DeductionActiveToggleProps {
  deduction: Deduction;
}

export function DeductionActiveToggle({ deduction }: DeductionActiveToggleProps) {
  const [isActive, setIsActive] = useState(deduction.is_active);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const result = await toggleDeductionActive(deduction.id, !isActive);
    
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
