import {getMockState} from 'src/test/utils';
import {selectExample} from './selectExample';
import * as Mocks from 'src/mocks';

describe('selectExample', () => {
  it('should return false for initialState', () => {
    const mockState = getMockState();
    const expected = false;
    const actual = selectExample(mockState);
    expect(actual).toEqual(expected);
  });

  it('should return true if example has data', () => {
    const mockState = getMockState(draft => {
      draft.user.data = Mocks.users;
    });
    const expected = true;

    const actual = selectExample(mockState);
    expect(actual).toEqual(expected);
  });
});
