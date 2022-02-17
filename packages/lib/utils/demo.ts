import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

/**
 * Checks if an string is a valid email
 *
 * @param val - The email the we want to validate
 *
 * e.g.
 *
 * matias@radiumrocket.com -> true
 * matias@radiumrocket.c -> false
 * matias@radiumrocket -> false
 *
 */
export function isEmailValid(val: string): boolean {
  const reg =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(val);
}

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

/**
 * Get the device window height using RN Dimensions
 *
 * Return value: number
 *
 * e.g.
 *
 * 680
 * 946
 *
 */
export function getWindowHeight(): number {
  return height;
}
