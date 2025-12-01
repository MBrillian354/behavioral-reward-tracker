/**
 * Get array of dates for the week containing the given date
 * Week starts on Monday
 */
export function getWeekDates(date: Date): Date[] {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(date);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);

  const weekDates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekDates.push(d);
  }
  return weekDates;
}

/**
 * Format date in Indonesian locale
 * Example: "Senin, 1 Desember 2024"
 */
export function formatDateIndonesian(date: Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('id-ID', options || defaultOptions);
}

/**
 * Format date short in Indonesian locale
 * Example: "1 Des"
 */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });
}

/**
 * Check if the given date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Get date string in YYYY-MM-DD format for database
 */
export function toDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parse YYYY-MM-DD string to Date
 */
export function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

/**
 * Get Indonesian day name
 */
export function getDayName(date: Date): string {
  return date.toLocaleDateString('id-ID', { weekday: 'long' });
}

/**
 * Get Indonesian short day name
 */
export function getDayShortName(date: Date): string {
  return date.toLocaleDateString('id-ID', { weekday: 'short' });
}
