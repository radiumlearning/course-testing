import {createAsyncThunk} from '@reduxjs/toolkit';

import {Todo} from '@rn-testing-class/lib/interfaces';
import {AppDispatch, RootState} from '../../..';
import {selectHasTodos} from '../selectors/selectHasTodos';
import * as API from '../api';

export const fetchTodosAction = createAsyncThunk<
  Todo[],
  undefined,
  {state: RootState; dispatch: AppDispatch}
>(
  'todos/FETCH_TODOS',
  async () => {
    const res = await API.getTodos();
    return res.data;
  },
  {
    condition: (_, {getState}) => {
      if (selectHasTodos(getState())) return false;
    },
  },
);
