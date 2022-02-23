/**
 * Sum 2 values and return the result
 * It logs and returns 0 if one of them is not a number
 *
 * @param a - Number
 * @param b - Number
 *
 * e.g.
 *
 * 4, 7       -> 11
 * STRING, 7  -> 0
 * 4, []      -> 0
 *
 */
export const sum = (a: number, b: number) => {
  if (typeof a !== 'number') {
    console.warn(`${a} is not a number`);
    return 0;
  }

  if (typeof b !== 'number') {
    console.warn(`${b} is not a number`);
    return 0;
  }

  return a + b;
};
