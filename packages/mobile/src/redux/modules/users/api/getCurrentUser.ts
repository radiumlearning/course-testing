import {get, APIPromise} from '../../../../api';
import {User} from '@rn-testing-class/lib/interfaces';

export type GetUserOutput = User;

export const getCurrentUser = (userId: number): APIPromise<GetUserOutput> =>
  get(`/users/${userId}`);
