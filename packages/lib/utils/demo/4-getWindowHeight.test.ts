import * as Utils from './index';

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({height: 930}),
}));

describe('getWindowHeight', () => {
  it('returns 930 when window height is 930', () => {
    const actual = Utils.getWindowHeight();
    expect(actual).toBe(930);
  });
});
