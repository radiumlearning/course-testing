import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../..';

const todosDataSelector = (state: RootState) => state?.todos?.data;

export const selectHasTodos = createSelector(
  todosDataSelector,
  (todosData): boolean => !!todosData?.length,
);
