import { notFound } from 'next/navigation';
import { requireRole } from '@/lib/actions/auth';
import { getDeduction } from '@/lib/actions/deductions';
import { DeductionForm } from '@/components/admin/deduction-form';

interface EditDeductionPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDeductionPage({ params }: EditDeductionPageProps) {
  const { id } = await params;
  const session = await requireRole('admin');
  const deduction = await getDeduction(id);

  if (!deduction) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <DeductionForm deduction={deduction} userId={session.userId} />
    </div>
  );
}
