import {Dimensions, Linking} from 'react-native';
import Big from 'big.js';

// Big.js Setup
/*
 * Support rounding to 14 decimal places
 */
Big.DP = 14;

/*
 * Implements ROUND_HALF_UP
 */
Big.RM = 1;
// End Big.js Setup

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

// 2)
/**
 * Determines the role of a user given their email address.
 *
 * @param emailAddress - The email to check, can be a string of any length.
 *
 * e.g.
 *
 * "luciaraschetti@radiumrocket.com" -> "admin"
 *
 */
export function getUserType(emailAddress?: string): 'admin' | 'user' {
  if (!emailAddress) {
    return 'user';
  }

  return emailAddress.endsWith('@radiumrocket.com') ? 'admin' : 'user';
}

type User = {
  firstName: string;
  lastName: string;
};

// 3)
/**
 * Returns the user's full name or either their First or Last name.
 *
 * @param user - Can be any user that has First and/or Last names.
 *
 * e.g.
 *
 * "{firstName: "Lucia", lastName: "Raschetti"}" -> "Lucia Raschetti"
 *
 */
export const getFullName = (user: User): string => {
  if (!user) {
    return '';
  }
  const {firstName, lastName} = user;

  if (!firstName && lastName) {
    return lastName;
  }
  if (firstName && !lastName) {
    return firstName;
  }
  if (!firstName && !lastName) {
    return '';
  }
  return `${firstName} ${lastName}`;
};

// 4)
/**
 * Get the device window width using RN Dimensions
 *
 * Return value: number
 *
 * e.g.
 *
 * 332
 * 648
 *
 */
export function getWindowWidth(): number {
  const {width} = Dimensions.get('window');

  return width;
}

// 5)
/**
 * Returns a formatted USA phone number (format: XXX-XXX-XXXX)
 *
 *
 * @param phoneNumber - The phone numbera as string or number to format
 * @param noPhoneString [noPhoneString="-"] - A string to display if the phone number is empty/null/undefined
 * @param separator [separator="-"] - A string to use as separator *
 *
 * e.g.
 *
 * "1234567891" -> "123-456-7891"
 *
 * e.g. with separator = .
 *
 * "1234567891" -> "123.456.7891"
 *
 */
export const formatPhoneNumber = (
  phoneNumber?: string | number,
  noPhoneString = '-',
  separator = '-',
): string => {
  if (!phoneNumber) {
    return noPhoneString;
  }
  const phoneNumberString = phoneNumber.toString();
  const cleaned = phoneNumberString.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  return match
    ? `${match[1]}${separator}${match[2]}${separator}${match[3]}`
    : noPhoneString;
};

// 6)
/**
 * Removes all non numeric characters and format the string of 9 digits into SSN.
 *
 * @param value - The value to format, can be a 9 digit number or lower
 * @param previousValue - The previous state of the value
 *
 * e.g.
 *
 * 000000000 -> (000-00-0000)
 */
export const formatSSN = (value: string, previousValue: string): string => {
  // return empty string if no value
  if (!value) {
    return '';
  }

  const dashRegex = /-/g;
  const nonAlphabeticCharOrWhiteSpacesRegex = /^\s+|\s+$|[^0-9-]/g;

  // only allows 0-9 inputs
  const currentValue = value.replace(nonAlphabeticCharOrWhiteSpacesRegex, '');
  const lastChar = currentValue[currentValue.length - 1];

  const currentValueLength = currentValue.length;
  let finalVal = currentValue;

  if (!previousValue || currentValueLength > previousValue.length) {
    if (currentValueLength <= 4) {
      finalVal = currentValue.match(/.{1,3}/g)?.join('-') || currentValue;
    }
    if (currentValueLength === 7) {
      finalVal = currentValue.match(/.{1,6}/g)?.join('-') || currentValue;
    }
    if (value.replace(dashRegex, '').length === 9 && value.length !== 11) {
      finalVal = `${value.substring(0, 3)}-${value.substring(
        3,
        5,
      )}-${value.substring(5, 11)}`;
      return finalVal;
    }
    return finalVal;
  } else if (['-'].includes(lastChar)) {
    return currentValue.slice(0, -1);
  } else if (lastChar === ' ') {
    return currentValue.slice(0, -2);
  }

  return currentValue;
};

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

// 8)
/**
 * Checks if an URL can be opened and open it
 * It console errors in case of URL is empty, not supported or openURL has an issue opening it.
 *
 * @param url - string
 *
 */
export function goToUrl(url?: string): void {
  if (url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.error('URL not valid');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.error('Empty URL');
  }
}
