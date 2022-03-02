import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';

import {User} from '@rn-testing-class/lib/interfaces';

import {fetchExampleAction} from './actions';

export default combineReducers({
  data: createReducer<User[]>([], builder => {
    builder
      .addCase(fetchExampleAction.fulfilled, (_, action) => action.payload)
      .addCase(fetchExampleAction.rejected, () => []);
  }),
  error: createReducer('', builder => {
    builder
      .addCase(fetchExampleAction.fulfilled, () => '')
      .addCase(fetchExampleAction.pending, () => '')
      .addCase(
        fetchExampleAction.rejected,
        (_, action) => action.error.message || 'Error loading example',
      );
  }),
  isFetching: createReducer(false, builder => {
    builder
      .addCase(fetchExampleAction.fulfilled, () => false)
      .addCase(fetchExampleAction.rejected, () => false)
      .addCase(fetchExampleAction.pending, () => true);
  }),
});
