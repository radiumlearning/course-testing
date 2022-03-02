import {combineReducers} from 'redux';
import {createReducer} from '@reduxjs/toolkit';

import {User} from '@rn-testing-class/lib/interfaces';

import {
  fetchUsersAction,
  fetchCurrentUserAction,
  fetchActiveUsersAction,
} from './actions';

export default combineReducers({
  data: createReducer<User[]>([], builder => {
    builder
      .addCase(fetchUsersAction.fulfilled, (_, action) => action.payload)
      .addCase(fetchUsersAction.rejected, () => []);
  }),
  error: createReducer('', builder => {
    builder
      .addCase(fetchUsersAction.fulfilled, () => '')
      .addCase(fetchUsersAction.pending, () => '')
      .addCase(
        fetchUsersAction.rejected,
        (_, action) => action.error.message || 'Error loading users',
      );
  }),
  isFetching: createReducer(false, builder => {
    builder
      .addCase(fetchUsersAction.fulfilled, () => false)
      .addCase(fetchUsersAction.rejected, () => false)
      .addCase(fetchUsersAction.pending, () => true);
  }),
  currentUser: combineReducers({
    data: createReducer<User | null>(null, builder => {
      builder
        .addCase(
          fetchCurrentUserAction.fulfilled,
          (_, action) => action.payload,
        )
        .addCase(fetchCurrentUserAction.rejected, () => null);
    }),
    error: createReducer('', builder => {
      builder
        .addCase(fetchCurrentUserAction.fulfilled, () => '')
        .addCase(fetchCurrentUserAction.pending, () => '')
        .addCase(
          fetchCurrentUserAction.rejected,
          (_, action) => action.error.message || 'Error fetching user data',
        );
    }),
    isFetching: createReducer(false, builder => {
      builder
        .addCase(fetchCurrentUserAction.fulfilled, () => false)
        .addCase(fetchCurrentUserAction.rejected, () => false)
        .addCase(fetchCurrentUserAction.pending, () => true);
    }),
  }),
  activeUsers: combineReducers({
    data: createReducer<User[]>([], builder => {
      builder
        .addCase(
          fetchActiveUsersAction.fulfilled,
          (_, action) => action.payload,
        )
        .addCase(fetchActiveUsersAction.rejected, () => []);
    }),
    error: createReducer('', builder => {
      builder
        .addCase(fetchCurrentUserAction.fulfilled, () => '')
        .addCase(fetchCurrentUserAction.pending, () => '')
        .addCase(
          fetchCurrentUserAction.rejected,
          (_, action) => action.error.message || 'Error fetching user data',
        );
    }),
    isFetching: createReducer(false, builder => {
      builder
        .addCase(fetchCurrentUserAction.fulfilled, () => false)
        .addCase(fetchCurrentUserAction.rejected, () => false)
        .addCase(fetchCurrentUserAction.pending, () => true);
    }),
  }),
});
