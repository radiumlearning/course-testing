import {get, APIPromise} from '../../../../api';
import {Todo} from '@rn-testing-class/lib/interfaces';

export type GetTodosOutput = Todo[];

export const getTodos = (): APIPromise<GetTodosOutput> => get(`/todos`);
