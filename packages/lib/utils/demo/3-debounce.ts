/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param callback - The callback function to be executed after the delay time
 * @param delay - The delay time to execute the debounce callback
 *
 */
let debounceTimer: ReturnType<typeof setTimeout> | undefined;

export const debounce = (callback: () => void, delay = 500): void => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }

  debounceTimer = setTimeout(() => {
    callback();
  }, delay);
};
