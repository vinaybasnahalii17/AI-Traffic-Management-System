export function createHistoryEntry() {
  return {
    timestamp: new Date().toISOString()
  };
}
export function getHistoryCount(
  entries: any[]
): number {
  return entries.length;
}
