export type User = {
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
