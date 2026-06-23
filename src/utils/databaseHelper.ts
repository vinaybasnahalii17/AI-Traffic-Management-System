export function saveRecord(record: string): string {
  return `Saved: ${record}`;
}

export function deleteRecord(recordId: number): string {
  return `Deleted record ${recordId}`;
}

export function updateRecord(recordId: number): string {
  return `Updated record ${recordId}`;
}
