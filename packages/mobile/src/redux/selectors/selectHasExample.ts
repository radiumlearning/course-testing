import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../index';

const exampleDataSelector = (state: RootState) => state?.example?.data;

export const selectHasExample = createSelector(
  exampleDataSelector,
  (exampleData): boolean => !!exampleData?.length,
);
