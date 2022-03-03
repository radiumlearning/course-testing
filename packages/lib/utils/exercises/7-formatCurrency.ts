import Big from 'big.js';

// 7)
/**
 * Format a number or string into currency.
 *
 * e.g.
 * 1 -> $1.00
 * -1 -> ($1.00)
 */
export const formatCurrency = (value?: string | number | null): string => {
  const v = Big(value || 0);

  if (v.eq(Big(1000))) {
    return `$${v.toFixed(0)}`;
  }

  // If less than zero, return negative notation
  if (v.lt(0)) {
    return `($${v.abs().toFixed(2)})`;
  }

  return `$${v.toFixed(2)}`;
};
