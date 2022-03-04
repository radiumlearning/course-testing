import * as Utils from './index';

describe('isEmailValid', () => {
  it('returns true when is a valid email', () => {
    const actual = Utils.isEmailValid('matias@radiumrocket.com');
    expect(actual).toBe(true);
    expect(actual).toBeTruthy();
  });

  it('returns false when is not a valid email', () => {
    const actual = Utils.isEmailValid('matias@radiumrocket.c');
    expect(actual).toBe(false);
    expect(actual).toBeFalsy();
  });

  it('returns false when value is null', () => {
    const actual = Utils.isEmailValid(null);
    expect(actual).toBe(false);
    expect(actual).toBeFalsy();
  });

  // esto mismo se puede hacer en forma de tabla
  it.each`
    input                       | expected
    ${'matias@radiumrocket.cm'} | ${true}
    ${'hola'}                   | ${false}
  `('takes $input and returns $expected', ({input, expected}) => {
    const actual = Utils.isEmailValid(input);
    expect(actual).toBe(expected);
  });

  // it.each`
  //   input                 | expected
  //   ${'test@example.com'} | ${true}
  //   ${'t3st@a.it'}        | ${true}
  //   ${'test@example,com'} | ${false}
  //   ${'testexample.com'}  | ${false}
  //   ${null}               | ${false}
  //   ${undefined}          | ${false}
  //   ${0}                  | ${false}
  // `('takes $input and returns $expected', ({input, expected}) => {
  //   // SUT
  //   const actual = Utils.isEmailValid(input);
  //   expect(actual).toEqual(expected);
  // });
});
