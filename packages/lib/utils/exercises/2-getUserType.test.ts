import * as Utils from './index';

describe('getUserType', () => {
  it.each`
    input                         | expected
    ${'something'}                | ${'user'}
    ${'test@gmail.com'}           | ${'user'}
    ${'someone@radiumrocket.co'}  | ${'user'}
    ${'someone@radiumrocket.com'} | ${'admin'}
    ${''}                         | ${'user'}
    ${undefined}                  | ${'user'}
    ${null}                       | ${'user'}
  `('takes $input and returns $expected', ({input, expected}) => {
    const actual = Utils.getUserType(input);
    expect(actual).toEqual(expected);
  });
});
