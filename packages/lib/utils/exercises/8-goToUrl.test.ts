import {Linking} from 'react-native';
import * as Utils from './index';

describe('goToUrl', () => {
  it('successfully opens the url', async () => {
    const canOpenURLSpy = jest
      .spyOn(Linking, 'canOpenURL')
      .mockImplementationOnce(() => Promise.resolve(true));
    const openURLSpy = jest
      .spyOn(Linking, 'openURL')
      .mockImplementationOnce(jest.fn());
    const url = 'https://something.com';

    Utils.goToUrl(url);

    await expect(canOpenURLSpy).toHaveBeenCalled();
    expect(canOpenURLSpy).toHaveBeenCalledTimes(1);
    expect(openURLSpy).toHaveBeenCalledWith(url);
    canOpenURLSpy.mockRestore();
    openURLSpy.mockRestore();
  });

  it('console.warn when cannot open the url', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    const canOpenURLSpy = jest
      .spyOn(Linking, 'canOpenURL')
      .mockImplementation(() =>
        Promise.reject(new Error('cannot open the url')),
      );
    const url = 'https://something2.com';

    Utils.goToUrl(url);

    // fake waiting for console.warn to be called
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(canOpenURLSpy).toHaveBeenCalledTimes(1);
    await expect(canOpenURLSpy).toHaveBeenCalledWith(url);

    await expect(warnSpy).toHaveBeenCalledWith(
      new Error('cannot open the url'),
    );
    canOpenURLSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('console.warn when url is not supported', async () => {
    const canOpenURLSpy = jest
      .spyOn(Linking, 'canOpenURL')
      .mockImplementation(() => Promise.resolve(false));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    const url = 'https://something2.com';

    Utils.goToUrl(url);

    expect(canOpenURLSpy).toHaveBeenCalledTimes(1);
    await expect(canOpenURLSpy).toHaveBeenCalledWith(url);

    await expect(warnSpy).toHaveBeenCalledWith('URL not valid');
    canOpenURLSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('console.warn when url is not supported', async () => {
    const canOpenURLSpy = jest
      .spyOn(Linking, 'canOpenURL')
      .mockImplementation(() => Promise.resolve(false));

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(jest.fn());

    Utils.goToUrl('');

    expect(canOpenURLSpy).not.toHaveBeenCalled();

    await expect(warnSpy).toHaveBeenCalledWith('Empty URL');
  });
});
