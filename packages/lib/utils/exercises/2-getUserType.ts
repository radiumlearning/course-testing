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
