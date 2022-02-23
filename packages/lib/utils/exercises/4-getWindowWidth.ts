import {Dimensions} from 'react-native';

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
