import * as Utils from './index';

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({width: 340}),
}));

describe('getWindowHeight', () => {
  it('returns 340 when window width is 340', () => {
    const actual = Utils.getWindowWidth();
    expect(actual).toBe(340);
  });
});
