import {createAsyncThunk} from '@reduxjs/toolkit';

import {User} from '@rn-testing-class/lib/interfaces';
import {AppDispatch, RootState} from '../../../..';
import * as API from '../../api';

export const fetchActiveUsersAction = createAsyncThunk<
  User[],
  undefined,
  {state: RootState; dispatch: AppDispatch}
>('users/FETCH_ACTIVE_USERS', async () => {
  const res = await API.getUsers();
  return res.data.filter(user => user.status === 'active');
});
