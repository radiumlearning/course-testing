import {createAsyncThunk} from '@reduxjs/toolkit';

import {User} from '@rn-testing-class/lib/interfaces';
import {AppDispatch, RootState} from 'src/redux';
import {selectHasExample} from 'src/redux/selectors/selectHasExample';
import * as API from 'src/redux/modules/example/api';

export const fetchExampleAction = createAsyncThunk<
  User[],
  undefined,
  {state: RootState; dispatch: AppDispatch}
>(
  'example/FETCH_EXAMPLE',
  async () => {
    const res = await API.getExample();
    return res.data;
  },
  {
    condition: (_, {getState}) => {
      if (selectHasExample(getState())) return false;
    },
  },
);
