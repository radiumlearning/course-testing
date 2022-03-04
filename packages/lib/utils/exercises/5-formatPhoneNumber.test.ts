import * as Utils from './index';

describe('formatPhoneNumber', () => {
  it.each`
    input                 | expected
    ${'1234567891'}       | ${'123-456-7891'}
    ${1234567891}         | ${'123-456-7891'}
    ${'12/34.56* 789< 1'} | ${'123-456-7891'}
    ${'(123) 456-7891'}   | ${'123-456-7891'}
    ${'12345'}            | ${'-'}
    ${''}                 | ${'-'}
    ${null}               | ${'-'}
    ${undefined}          | ${'-'}
    ${NaN}                | ${'-'}
    ${1}                  | ${'-'}
    ${-1}                 | ${'-'}
    ${0}                  | ${'-'}
    ${' '}                | ${'-'}
    ${false}              | ${'-'}
    ${true}               | ${'-'}
  `('takes $input and returns $expected', ({input, expected}) => {
    const actual = Utils.formatPhoneNumber(input);
    expect(actual).toEqual(expected);
  });
  it.each`
    input           | noPhoneString     | separator    | expected
    ${'1234567891'} | ${'xxx-xxx-xxxx'} | ${undefined} | ${'123-456-7891'}
    ${'1234567891'} | ${'xxx-xxx-xxxx'} | ${'.'}       | ${'123.456.7891'}
    ${'1234567891'} | ${'xxx-xxx-xxxx'} | ${' '}       | ${'123 456 7891'}
    ${''}           | ${'xxx-xxx-xxxx'} | ${undefined} | ${'xxx-xxx-xxxx'}
    ${null}         | ${'xxx-xxx-xxxx'} | ${' '}       | ${'xxx-xxx-xxxx'}
    ${undefined}    | ${'xxx-xxx-xxxx'} | ${'.'}       | ${'xxx-xxx-xxxx'}
    ${NaN}          | ${'xxx-xxx-xxxx'} | ${'.'}       | ${'xxx-xxx-xxxx'}
    ${0}            | ${'xxx-xxx-xxxx'} | ${'.'}       | ${'xxx-xxx-xxxx'}
    ${' '}          | ${'xxx-xxx-xxxx'} | ${'.'}       | ${'xxx-xxx-xxxx'}
    ${false}        | ${'xxx-xxx-xxxx'} | ${'.'}       | ${'xxx-xxx-xxxx'}
    ${true}         | ${'xxx-xxx-xxxx'} | ${'.'}       | ${'xxx-xxx-xxxx'}
  `(
    'takes $input with default value $noPhoneString, separator $separator and returns $expected',
    ({input, noPhoneString, expected, separator}) => {
      const actual = Utils.formatPhoneNumber(input, noPhoneString, separator);
      expect(actual).toEqual(expected);
    },
  );
});
