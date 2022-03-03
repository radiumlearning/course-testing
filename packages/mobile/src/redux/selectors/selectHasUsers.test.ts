import {getMockState} from 'src/test/utils';
import {selectHasUsers} from './selectHasUsers';
import * as Mocks from 'src/mocks';

describe('selectHasExample', () => {
  it('should return false for initialState', () => {
    const mockState = getMockState();
    const expected = false;
    const actual = selectHasUsers(mockState);
    expect(actual).toEqual(expected);
  });

  it('should return true if example has data', () => {
    const mockState = getMockState(draft => {
      draft.user.data = Mocks.users;
    });
    const expected = true;

    const actual = selectHasUsers(mockState);
    expect(actual).toEqual(expected);
  });
});
