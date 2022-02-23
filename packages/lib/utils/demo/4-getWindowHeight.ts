import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

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
