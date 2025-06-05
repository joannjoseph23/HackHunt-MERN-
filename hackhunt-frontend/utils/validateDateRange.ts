// utils/validateDateRange.ts
export function isValidDateRange(runsFrom: string): boolean {
  const [startStr, endStr] = runsFrom.split('-').map(s => s.trim());

  if (!startStr || !endStr) return false;

  const start = new Date(startStr);
  const end = new Date(endStr);

  return start < end;
}
