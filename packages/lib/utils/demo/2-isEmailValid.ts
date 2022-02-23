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
export const isEmailValid = (val: string): boolean => {
  const reg =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(val);
};
