import {Middleware} from '@reduxjs/toolkit';

export const throwMiddleware: Middleware = () => next => action => {
  next(action);
  if (action?.error) {
    throw action.error;
  }
};
