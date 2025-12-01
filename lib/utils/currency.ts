/**
 * Format number to Indonesian Rupiah format
 * Example: 10000 -> "Rp 10.000"
 */
export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

/**
 * Parse Rupiah string back to number
 * Example: "Rp 10.000" -> 10000
 */
export function parseRupiah(str: string): number {
  const cleaned = str.replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}
