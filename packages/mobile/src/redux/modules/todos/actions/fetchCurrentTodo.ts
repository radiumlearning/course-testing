import {createAsyncThunk} from '@reduxjs/toolkit';
import {Todo} from '@rn-testing-class/lib/interfaces';
import {AppDispatch, RootState} from '../../..';
import * as API from '../api';

export const fetchCurrentTodoAction = createAsyncThunk<
  Todo,
  {todoId: number} | undefined,
  {state: RootState; dispatch: AppDispatch}
>('todos/FETCH_CURRENT_TODO', async (input, {getState}) => {
  if (input) {
    const todoId = getState().todos.data.find(
      todo => todo.id === input?.todoId,
    );

    if (!todoId) {
      throw new Error('Unable to match todoId with existing todo');
    }

    if (todoId && input?.todoId) {
      const res = await API.getCurrentTodo(input?.todoId);
      return res.data;
    }
  }

  throw new Error('No todoId to fetchCurrentTodoAction');
});
