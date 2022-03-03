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
