/**
 * React Testing Library overrides setup
 * https://testing-library.com/docs/react-testing-library/setup
 */

import React from 'react';
import {
  render as rtlRender,
  RenderOptions,
} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContext, NavigationProp} from '@react-navigation/native';

import {RootState} from 'src/redux';
import {getMockStore} from './utils';

type Opts = RenderOptions & {
  initialState?: RootState;

  /**
   * Mock store object returned from getMockStore
   */
  mockStore?: ReturnType<typeof getMockStore>;
};

const navContext = {
  isFocused: () => true,
  addListener: jest.fn(() => jest.fn()),
} as any as NavigationProp<Record<string, any>, string, any, any, any>;

const render = (ui: Parameters<typeof rtlRender>[0], opts: Opts = {}) => {
  const {initialState, mockStore: _store, ...renderOptions} = opts;
  const mockStore = _store || getMockStore(initialState);
  const Wrapper: React.FC = ({children}) => (
    <Provider store={mockStore.store}>
      <NavigationContext.Provider value={navContext}>
        {children}
      </NavigationContext.Provider>
    </Provider>
  );
  const rtlRenderResult = rtlRender(ui, {wrapper: Wrapper, ...renderOptions});
  return {
    ...rtlRenderResult,
    mockStore,
  };
};

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {render};
