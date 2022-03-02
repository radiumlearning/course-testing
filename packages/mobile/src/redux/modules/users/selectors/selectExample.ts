import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../../..';

const exampleDataSelector = (state: RootState) => state?.user?.data;

export const selectExample = createSelector(
  exampleDataSelector,
  (exampleData): boolean => !!exampleData?.length,
);
