import * as Utils from './index';

describe('sum', () => {
  let warnSpy: jest.SpyInstance;

  beforeAll(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns 9 when a = 4 and b = 5', () => {
    const actual = Utils.sum(4, 5);
    expect(actual).toBe(9);
  });

  it('returns 0 when a is not a number', async () => {
    const actual = Utils.sum('asd' as any, 5);

    expect(actual).toBe(0);

    // mock implementation
    expect(warnSpy).toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('asd is not a number');
  });

  it('returns 0 when b is not a number', () => {
    const actual = Utils.sum(4, 'asd' as any);
    expect(actual).toBe(0);

    // mock implementation
    expect(warnSpy).toHaveBeenCalled();

    // VA A FALLAR SI SE LIMPIAN LO MOCKS EN EL afterEach
    // expect(warnSpy).toHaveBeenCalledTimes(2);

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith('asd is not a number');
  });
});
