export function calculateDiscountPrice(before: number, after: number): number {
  return ((before - after) / before) * 100;
}