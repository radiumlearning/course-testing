import {getMockState} from 'src/test/utils';
import {selectHasExample} from './selectHasExample';
import * as Mocks from 'src/mocks';

describe('selectHasExample', () => {
  it('should return false for initialState', () => {
    const mockState = getMockState();
    const expected = false;
    const actual = selectHasExample(mockState);
    expect(actual).toEqual(expected);
  });

  it('should return true if example has data', () => {
    const mockState = getMockState(draft => {
      draft.example.data = Mocks.users;
    });
    const expected = true;

    const actual = selectHasExample(mockState);
    expect(actual).toEqual(expected);
  });
});
