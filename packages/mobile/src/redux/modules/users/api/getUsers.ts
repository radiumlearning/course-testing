import {get, APIPromise} from '../../../../api';
import {User} from '@rn-testing-class/lib/interfaces';

export type GetUsersOutput = User[];

export const getExample = (): APIPromise<GetUsersOutput> => get(`/users`);
