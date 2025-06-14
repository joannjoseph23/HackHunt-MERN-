export function isValidURL(url: string): boolean {
  return /^https?:\/\/.+\..+/.test(url);
}

export function isValidDateRange(input: string): boolean {
  const [start, end] = input.split(' - ');
  if (!start || !end) return false;
  return new Date(start) <= new Date(end);
}
