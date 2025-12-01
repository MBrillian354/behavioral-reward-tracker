import { getDeductions } from '@/lib/actions/deductions';
import { DeductionsPageClient } from './deductions-page-client';

export default async function AdminDeductionsPage() {
  const deductions = await getDeductions();

  return <DeductionsPageClient deductions={deductions} />;
}
