import {rest} from 'msw';
import {server} from 'src/mocks/server';
import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';
import {getMockState, getMockStore} from 'src/test/utils';
import * as Mocks from 'src/mocks';

import {fetchTodosAction} from './fetchTodos';

describe('todos/FETCH_TODOS', () => {
  it('fetches todo data', async () => {
    const {store, getActionTypes} = getMockStore();

    expect(store.getState().todos.data).toEqual([]);

    await expect(store.dispatch(fetchTodosAction())).resolves.toMatchObject({
      payload: Mocks.todos,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "todos/FETCH_TODOS/pending",
        },
        Object {
          "type": "todos/FETCH_TODOS/fulfilled",
        },
      ]
    `);

    expect(store.getState().todos.data).toEqual(Mocks.todos);
  });

  it('rejects if API fails', async () => {
    const {store, getActionTypes} = getMockStore();

    server.use(
      rest.get(`${BASE_API_URL}/todos`, (_, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    await expect(
      store.dispatch(fetchTodosAction()),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Request failed with status code 400"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "todos/FETCH_TODOS/pending",
        },
        Object {
          "type": "todos/FETCH_TODOS/rejected",
        },
      ]
    `);

    expect(store.getState().todos.data).toEqual([]);
  });

  it('skips if todo data is already loaded', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.todos.data = Mocks.todos;
      }),
    );

    await expect(store.dispatch(fetchTodosAction())).resolves.toMatchObject({
      payload: undefined,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`Array []`);
  });
});
