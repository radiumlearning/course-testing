import * as Utils from './demo';

describe('isEmailValid', () => {
  it.each`
    input                 | expected
    ${'test@example.com'} | ${true}
    ${'t3st@a.it'}        | ${true}
    ${'test@example,com'} | ${false}
    ${'testexample.com'}  | ${false}
  `('takes $input and returns $expected', ({input, expected}) => {
    // SUT
    const actual = Utils.isEmailValid(input);
    expect(actual).toEqual(expected);
  });
});
