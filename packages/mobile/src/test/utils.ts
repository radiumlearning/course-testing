/**
 * Random Jest testing utils
 */

import {Action, AnyAction, configureStore, Middleware} from '@reduxjs/toolkit';
import produce, {Draft} from 'immer';
import set from 'lodash/set';

import {rootReducer, RootState, rtkConfig} from 'src/redux';
import {throwMiddleware} from 'src/redux/middleware/throwMiddleware';
import {NavProps, MainStackRoutes} from 'src/types';

/**
 * Returns the initial reducer state tree
 */
export const getInitialState = (): RootState =>
  rootReducer(undefined, {type: '_unknown'});

type Empty = Record<string, undefined>;

const createMockMiddleware = (
  mock: jest.Mock,
): Middleware<Empty, RootState> => {
  return () => next => action => {
    mock(action);
    next(action);
  };
};

/**
 * Returns a mock RootState for tests needing Redux state.
 */
export function getMockState(
  pathOrProduce?: string,
  value?: unknown,
): RootState;
export function getMockState(
  pathOrProduce?: (draft: Draft<RootState>) => void,
): RootState;
export function getMockState(
  pathOrProduce?: string | ((draft: Draft<RootState>) => void),
  value?: unknown,
): RootState {
  const mockState = getInitialState();
  if (typeof pathOrProduce === 'function') {
    return produce<RootState>(mockState, pathOrProduce);
  }
  if (!pathOrProduce) return mockState;
  return set(mockState, pathOrProduce, value);
}

/**
 * Returns the properly typed react-navigation props (cast to NavProps) that can
 * be used in typesafe unit tests.
 *
 * @param path - The key to be passed to navigation.getParams() to retrieve the
 * nav prop needed
 * @param value - The value returned by calling navigation.getParams(key)
 * @returns The NavProps object
 */
export const getMockNavProps = <RouteName extends MainStackRoutes>(
  path?: string,
  value?: unknown,
): NavProps<RouteName> => {
  const _params = {};
  if (path) set(_params, path, value);

  const mockProps = {
    navigation: {},
    route: {
      params: _params,
    },
  } as unknown as NavProps<RouteName>;

  return mockProps;
};

export const getMockStore = (initialState: RootState = getInitialState()) => {
  const mockMiddleware: jest.Mock<any, AnyAction[]> = jest.fn();
  const store = configureStore({
    ...rtkConfig,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat([throwMiddleware])
        .concat(createMockMiddleware(mockMiddleware)),
  });

  /**
   * Helper methods
   */
  const getActions = (): AnyAction[] =>
    mockMiddleware.mock.calls.flatMap(x => x);
  const getActionTypes = (): Action[] => getActions().map(({type}) => ({type}));

  return {
    store,
    mockMiddleware,
    getActionTypes,
    getActions,
  };
};
