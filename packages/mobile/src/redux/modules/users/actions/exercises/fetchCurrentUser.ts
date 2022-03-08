import {createAsyncThunk} from '@reduxjs/toolkit';
import {User} from '@rn-testing-class/lib/interfaces';
import {AppDispatch, RootState} from '../../../..';
import * as API from '../../api';

export const fetchCurrentUserAction = createAsyncThunk<
  User,
  {userId: number} | undefined,
  {state: RootState; dispatch: AppDispatch}
>('example/FETCH_CURRENT_USER', async (input, {getState}) => {
  if (input) {
    const userId = getState().user.data.find(user => user.id === input?.userId);

    if (!userId) {
      throw new Error('Unable to match userId with existing user');
    }

    if (userId && input?.userId) {
      const res = await API.getCurrentUser(input?.userId);
      return res.data;
    }
  }

  throw new Error('No userId to fetchCurrentUserAction');
});
