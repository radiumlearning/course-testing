export type UserStatus = 'active' | 'inactive';
export type UserGender = 'female' | 'male';

export interface User {
  id: number;
  name: string;
  email: string;
  gender: UserGender;
  status: UserStatus;
}
