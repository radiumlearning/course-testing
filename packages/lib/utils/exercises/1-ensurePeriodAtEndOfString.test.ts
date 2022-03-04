import * as Utils from './index';

describe('ensurePeriodAtEndOfString', () => {
  it.each`
    input                | expected
    ${'This is a test'}  | ${'This is a test.'}
    ${'This is a test.'} | ${'This is a test.'}
    ${'1234'}            | ${'1234.'}
    ${undefined}         | ${''}
    ${null}              | ${''}
    ${''}                | ${''}
  `('takes $input and returns $expected', ({input, expected}) => {
    const actual = Utils.ensurePeriodAtEndOfString(input);
    expect(actual).toEqual(expected);
  });
});
