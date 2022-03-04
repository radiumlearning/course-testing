/* eslint-disable promise/param-names */
import * as Utils from './index';

describe('debounce', () => {
  it('should call the function only once when debounce is called multiple times with an interval less than 500', async () => {
    const func = jest.fn();
    const debouncedFunc = () => Utils.debounce(func);

    // Call it immediately
    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(0); // func not called

    // Call it several times
    for (let i = 0; i < 5; i++) {
      debouncedFunc();
    }

    // Call it one more time with 400ms of interval
    await new Promise(r => setTimeout(r, 400));
    debouncedFunc();

    expect(func).toHaveBeenCalledTimes(0); // func not called

    // wait 500ms
    await new Promise(r => setTimeout(r, 500));
    expect(func).toHaveBeenCalledTimes(1); // func called
  });

  it('should call the function only once when debounce is called multiple times with an interval less than 700', async () => {
    const func = jest.fn();
    const debouncedFunc = () => Utils.debounce(func, 700);

    // Call it immediately
    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(0); // func not called

    // Call it several times
    for (let i = 0; i < 5; i++) {
      debouncedFunc();
    }

    // Call it one more time with 600ms of interval
    await new Promise(r => setTimeout(r, 600));
    debouncedFunc();

    expect(func).toHaveBeenCalledTimes(0); // func not called

    // wait 700ms
    await new Promise(r => setTimeout(r, 700));
    expect(func).toHaveBeenCalledTimes(1); // func called
  });
});
