import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';

const usersDataSelector = (state: RootState) => state?.user?.data;

export const selectHasUsers = createSelector(
  usersDataSelector,
  (usersData): boolean => !!usersData?.length,
);
