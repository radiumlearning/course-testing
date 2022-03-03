import {get, APIPromise} from '../../../../api';
import {Todo} from '@rn-testing-class/lib/interfaces';

export type GetCurrentTodoOutput = Todo;

export const getCurrentTodo = (
  todoId: number,
): APIPromise<GetCurrentTodoOutput> => get(`/todos/${todoId}`);
