import * as Utils from './index';

describe('formatSSN', () => {
  it.each`
    value           | previousValue | expected
    ${`000000000`}  | ${''}         | ${'000-00-0000'}
    ${``}           | ${''}         | ${''}
    ${`0000`}       | ${'000'}      | ${'000-0'}
    ${`000-000`}    | ${'000-00'}   | ${'000-00-0'}
    ${`abcdefghij`} | ${''}         | ${''}
    ${null}         | ${''}         | ${''}
    ${`000-0`}      | ${'000-00'}   | ${`000-0`}
    ${`000-`}       | ${'000-0'}    | ${`000`}
    ${`000-0 `}     | ${'000-00'}   | ${`000-0`}
    ${`000-0  `}    | ${'000-00'}   | ${`000-0`}
  `(
    'takes $value and $previousValue and returns $expected',
    ({value, previousValue, expected}) => {
      const actual = Utils.formatSSN(value, previousValue);
      expect(actual).toEqual(expected);
    },
  );
});
