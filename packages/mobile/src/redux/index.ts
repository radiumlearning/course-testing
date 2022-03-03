import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  createAction,
} from '@reduxjs/toolkit';

import {throwMiddleware} from './middleware/throwMiddleware';
import user from './modules/users/usersReducers';
import todos from './modules/todos/todosReducers';

export const resetStoreAction = createAction('auth/RESET_STORE');

export const rootReducer = combineReducers({
  user,
  todos,
});

export const rtkConfig = {
  devTools: {
    maxAge: 100,
    trace: true,
  },
  reducer: ((state, action) =>
    action.type === resetStoreAction.toString()
      ? rootReducer(undefined, action)
      : rootReducer(state, action)) as typeof rootReducer,
};

export const getStore = () =>
  configureStore({
    ...rtkConfig,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat([throwMiddleware]),
  });

/**
 * Types
 */

/**
 * Infer the `RootState`, `GetState`, and `AppDispatch` types from the store
 * itself
 */
export type GetState = ReturnType<typeof getStore>['getState'];
export type RootState = ReturnType<GetState>;
export type AppDispatch = ReturnType<typeof getStore>['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

/**
 * Override react-redux to declare RootState and useDispatch everywhere
 */
declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultRootState extends RootState {}
  export function useDispatch<TDispatch = AppDispatch>(): TDispatch;
}
