import {createAsyncThunk} from '@reduxjs/toolkit';

import {Todo} from '@rn-testing-class/lib/interfaces';
import {AppDispatch, RootState} from '../../..';
import * as API from '../api';

export const fetchCompletedTodosAction = createAsyncThunk<
  Todo[],
  undefined,
  {state: RootState; dispatch: AppDispatch}
>('todos/FETCH_COMPLETED_TODOS', async () => {
  const res = await API.getTodos();
  return res.data.filter(todo => todo.status === 'completed');
});
