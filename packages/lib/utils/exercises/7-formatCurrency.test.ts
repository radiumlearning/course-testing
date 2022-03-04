import * as Utils from './index';

describe('formatCurrency', () => {
  it.each`
    input        | expected
    ${1}         | ${'$1.00'}
    ${1.2}       | ${'$1.20'}
    ${1234.2}    | ${'$1234.20'}
    ${'1'}       | ${'$1.00'}
    ${'1.2'}     | ${'$1.20'}
    ${'1234.23'} | ${'$1234.23'}
    ${-1}        | ${'($1.00)'}
    ${-1.2}      | ${'($1.20)'}
    ${-1234.2}   | ${'($1234.20)'}
    ${0}         | ${'$0.00'}
    ${null}      | ${'$0.00'}
    ${undefined} | ${'$0.00'}
    ${'1000.00'} | ${'$1000'}
  `('should take $input and return $expected', ({input, expected}) => {
    const actual = Utils.formatCurrency(input);
    expect(actual).toEqual(expected);
  });
});
