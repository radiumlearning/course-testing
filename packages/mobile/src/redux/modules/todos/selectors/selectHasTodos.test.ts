import {getMockState} from 'src/test/utils';
import {selectHasTodos} from './selectHasTodos';
import * as Mocks from 'src/mocks';

describe('selectHasTodos', () => {
  it('should return false for initialState', () => {
    const mockState = getMockState();
    const expected = false;
    const actual = selectHasTodos(mockState);
    expect(actual).toEqual(expected);
  });

  it('should return true if todos has data', () => {
    const mockState = getMockState(draft => {
      draft.todos.data = Mocks.todos;
    });
    const expected = true;

    const actual = selectHasTodos(mockState);
    expect(actual).toEqual(expected);
  });
});
