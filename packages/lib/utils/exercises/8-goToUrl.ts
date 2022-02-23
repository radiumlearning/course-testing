import {Linking} from 'react-native';

// 8)
/**
 * Checks if an URL can be opened and open it
 * print a console warn in case of URL is empty, not supported or openURL has an issue opening it.
 *
 * @param url - string
 *
 */

// NOTE
// You have to mock canOpenURL and openURL functions
// canOpenURL should be a promise that returns a boolean
// openURL should only be a mock function, return value is not needed. E.g.: jest.fn()

// We need to test every scenario and verify that console.warn and Linking.openURL are executed.

export function goToUrl(url?: string): void {
  if (url) {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.warn('URL not valid');
        } else {
          Linking.openURL(url);
        }
      })
      .catch(error => {
        console.warn(error);
      });
  } else {
    console.warn('Empty URL');
  }
}
