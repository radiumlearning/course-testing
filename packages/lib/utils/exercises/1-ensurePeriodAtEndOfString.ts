// 1)
/**
 * Checks if a string ends with a period '.', if not, it adds one.
 *
 * @param val - The string to check, can be of any length
 *
 * e.g.
 *
 * "Hi, I'm Lucía" -> "Hi, I'm Lucía."
 *
 */
export function ensurePeriodAtEndOfString(val?: string): string {
  if (!val) {
    return '';
  }
  return val.endsWith('.') ? val : `${val}.`;
}
