import {ResponseResolver, rest, RestContext, RestRequest} from 'msw';

import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';

// Data mocks
import * as Mocks from './index';

export const TEST_ONLY_MOCK_API = `${BASE_API_URL}/test/index`;

const testOnlyMockApiHandler: ResponseResolver<
  RestRequest,
  RestContext,
  {test: string; error: string}
> = (req, res, ctx) => {
  // Allow sending an x-test-status-code header to force a particular status
  // code response
  const testStatusCode = req?.headers.get('x-test-status-code');
  if (testStatusCode) {
    return res(
      ctx.status(Number(testStatusCode)),
      ctx.json?.({test: 'statusCode', error: '_error_code_'}),
    );
  }
  return res(
    ctx.status(req.method === 'POST' ? 201 : 200),
    ctx.json?.({test: 'success', error: ''}),
  );
};

// https://mswjs.io/
export const handlers = [
  rest.get(TEST_ONLY_MOCK_API, testOnlyMockApiHandler),
  rest.post(TEST_ONLY_MOCK_API, testOnlyMockApiHandler),
  rest.delete(TEST_ONLY_MOCK_API, testOnlyMockApiHandler),
  rest.put(TEST_ONLY_MOCK_API, testOnlyMockApiHandler),
  rest.patch(TEST_ONLY_MOCK_API, testOnlyMockApiHandler),

  // GET example
  rest.get(`${BASE_API_URL}/users`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.users)),
  ),

  rest.get(`${BASE_API_URL}/users/:userId`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.user)),
  ),

  // POST example
  rest.post(
    `${BASE_API_URL}/users`,
    /* istanbul ignore next */ (_, res, ctx) =>
      res(ctx.status(200), ctx.json(Mocks.user)),
  ),

  // PATCH example
  rest.patch(
    `${BASE_API_URL}/users/:userId`,
    /* istanbul ignore next */ (_, res, ctx) =>
      res(ctx.status(200), ctx.json(Mocks.user)),
  ),

  // PUT example
  rest.put(
    `${BASE_API_URL}/users/:userId`,
    /* istanbul ignore next */ (_, res, ctx) =>
      res(ctx.status(200), ctx.json(Mocks.user)),
  ),

  // DELETE example
  rest.delete(
    `${BASE_API_URL}/users/:userId`,
    /* istanbul ignore next */ (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    },
  ),

  rest.get(`${BASE_API_URL}/todos`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.todos)),
  ),

  rest.get(`${BASE_API_URL}/todos/:todoId`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json(Mocks.todo)),
  ),
];
