import { requireRole } from '@/lib/actions/auth';
import { DeductionForm } from '@/components/admin/deduction-form';

export default async function NewDeductionPage() {
  const session = await requireRole('admin');

  return (
    <div className="max-w-2xl mx-auto">
      <DeductionForm userId={session.userId} />
    </div>
  );
}
