export function toPrettyDateTime(date: string): string {
  return new Date(date).toLocaleString();
}
