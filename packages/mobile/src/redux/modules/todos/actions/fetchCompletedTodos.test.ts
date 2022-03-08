import {rest} from 'msw';
import {server} from 'src/mocks/server';
import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';
import {getMockStore} from 'src/test/utils';
import * as Mocks from 'src/mocks';

import {fetchCompletedTodosAction} from './fetchCompletedTodos';

describe('todos/FETCH_COMPLETED_TODOS', () => {
  it('fetches completed todos', async () => {
    const completedTodosMock = Mocks.todos.filter(
      todo => todo.status === 'completed',
    );

    const {store, getActionTypes} = getMockStore();

    expect(store.getState().todos.completedTodos.data).toEqual([]);

    await expect(
      store.dispatch(fetchCompletedTodosAction()),
    ).resolves.toMatchObject({
      payload: Mocks.todos.filter(todo => todo.status === 'completed'),
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "todos/FETCH_COMPLETED_TODOS/pending",
        },
        Object {
          "type": "todos/FETCH_COMPLETED_TODOS/fulfilled",
        },
      ]
    `);

    expect(store.getState().todos.completedTodos.data).toEqual(
      completedTodosMock,
    );
  });

  it('rejects if API fails', async () => {
    const {store, getActionTypes} = getMockStore();

    server.use(
      rest.get(`${BASE_API_URL}/todos`, (_, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    await expect(
      store.dispatch(fetchCompletedTodosAction()),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Request failed with status code 400"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "todos/FETCH_COMPLETED_TODOS/pending",
        },
        Object {
          "type": "todos/FETCH_COMPLETED_TODOS/rejected",
        },
      ]
    `);

    expect(store.getState().todos.completedTodos.data).toEqual([]);
  });
});
