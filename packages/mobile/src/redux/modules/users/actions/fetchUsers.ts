import {createAsyncThunk} from '@reduxjs/toolkit';

import {User} from '@rn-testing-class/lib/interfaces';
import {AppDispatch, RootState} from '../../..';
import {selectHasUsers} from '../../../selectors/selectHasUsers';
import * as API from '../api';

export const fetchUsersAction = createAsyncThunk<
  User[],
  undefined,
  {state: RootState; dispatch: AppDispatch}
>(
  'users/FETCH_USERS',
  async () => {
    const res = await API.getUsers();
    return res.data;
  },
  {
    condition: (_, {getState}) => {
      if (selectHasUsers(getState())) return false;
    },
  },
);
