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
    /* istanbul ignore next */
    return currentValue.slice(0, -2);
  }

  return currentValue;
};
