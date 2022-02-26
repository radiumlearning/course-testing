import {rest} from 'msw';

import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';

// Data mocks
import * as Mocks from './index';

// https://mswjs.io/
export const handlers = [
  // GET example
  rest.get(`${BASE_API_URL}/users`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.users)),
  ),

  // POST example
  rest.post(`${BASE_API_URL}/users`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.user)),
  ),

  // PATCH example
  rest.patch(`${BASE_API_URL}/users/:userId`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.user)),
  ),

  // PUT example
  rest.put(`${BASE_API_URL}/users/:userId`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.user)),
  ),

  // DELETE example
  rest.delete(`${BASE_API_URL}/users/:userId`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
