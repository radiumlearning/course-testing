import {createSelector} from '@reduxjs/toolkit';
import {RootState} from 'src/redux';

const exampleDataSelector = (state: RootState) => state?.example?.data;

export const selectExample = createSelector(
  exampleDataSelector,
  (exampleData): boolean => !!exampleData?.length,
);
