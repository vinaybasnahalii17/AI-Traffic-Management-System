export function formatLogLevel(level: string): string {
  return level.toUpperCase();
}
export function isError(level: string): boolean {
  return level === "ERROR";
}
export function isWarning(level: string): boolean {
  return level === "WARNING";
}
