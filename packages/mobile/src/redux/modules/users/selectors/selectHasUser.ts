import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../..';

const userDataSelector = (state: RootState) => state?.user?.data;

export const selectHasUser = createSelector(
  userDataSelector,
  (userData): boolean => !!userData?.length,
);
