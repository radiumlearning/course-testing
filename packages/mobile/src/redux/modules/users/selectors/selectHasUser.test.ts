import {getMockState} from 'src/test/utils';
import {selectHasUser} from './selectHasUser';
import * as Mocks from 'src/mocks';

describe('selectHasUser', () => {
  it('should return false for initialState', () => {
    const mockState = getMockState();
    const expected = false;
    const actual = selectHasUser(mockState);
    expect(actual).toEqual(expected);
  });

  it('should return true if users has data', () => {
    const mockState = getMockState(draft => {
      draft.user.data = Mocks.users;
    });
    const expected = true;

    const actual = selectHasUser(mockState);
    expect(actual).toEqual(expected);
  });
});
