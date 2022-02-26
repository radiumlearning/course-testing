import {get, APIPromise} from 'src/api';
import {User} from '@rn-testing-class/lib/interfaces';

export type GetExampleOutput = User[];

export const getExample = (): APIPromise<GetExampleOutput> => get(`/users`);
