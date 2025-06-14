export function isValidURL(url: string): boolean {
  return /^https?:\/\/.+\..+/.test(url);
}
