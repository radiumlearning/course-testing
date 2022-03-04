import * as Utils from './index';

describe('getFullName', () => {
  const firstLast = {
    firstName: 'First',
    lastName: 'Last',
  } as Utils.User;
  const firstOnly = {
    firstName: 'First',
    lastName: '',
  } as Utils.User;
  const lastOnly = {
    firstName: '',
    lastName: 'Last',
  } as Utils.User;
  const neither = {
    firstName: '',
    lastName: '',
  } as Utils.User;

  it.each`
    desc                     | input        | expected
    ${'first and last name'} | ${firstLast} | ${'First Last'}
    ${'first name only'}     | ${firstOnly} | ${'First'}
    ${'last name only'}      | ${lastOnly}  | ${'Last'}
    ${'neither name'}        | ${neither}   | ${''}
    ${'empty object'}        | ${{}}        | ${''}
    ${'undefined'}           | ${undefined} | ${''}
    ${'null'}                | ${null}      | ${''}
  `('takes $desc and returns $expected', ({input, expected}) => {
    const actual = Utils.getFullName(input);
    expect(actual).toEqual(expected);
  });
});
