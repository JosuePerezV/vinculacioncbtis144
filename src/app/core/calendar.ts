export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function relativeDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return localDate(date);
}
export function schoolContext() {
  const date = new Date();
  const year = date.getFullYear() - (date.getMonth() < 7 ? 1 : 0);
  return {
    cycle: `${year}-${year + 1}`,
    period: date.getMonth() >= 1 && date.getMonth() < 7 ? '2' : '1',
  };
}
export function ageFromDate(birth: string): number {
  const today = new Date(),
    date = new Date(`${birth}T12:00:00`);
  return (
    today.getFullYear() -
    date.getFullYear() -
    (today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
      ? 1
      : 0)
  );
}
