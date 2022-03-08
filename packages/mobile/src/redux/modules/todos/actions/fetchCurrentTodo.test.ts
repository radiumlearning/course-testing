import {getMockState, getMockStore} from 'src/test/utils';
import * as Mocks from 'src/mocks';

import {fetchCurrentTodoAction} from './fetchCurrentTodo';

describe('todo/FETCH_CURRENT_TODO', () => {
  it('fetches todo data for the given todoId parameter', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.todos.data = Mocks.todos;
      }),
    );

    const todoId = 1824;

    await expect(
      store.dispatch(fetchCurrentTodoAction({todoId})),
    ).resolves.toMatchObject({
      payload: Mocks.todo,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "todos/FETCH_CURRENT_TODO/pending",
        },
        Object {
          "type": "todos/FETCH_CURRENT_TODO/fulfilled",
        },
      ]
    `);
  });

  it('fetches current todo data with unexistent todoId', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.todos.data = Mocks.todos;
      }),
    );

    const todoId = 4139;

    await expect(
      store.dispatch(fetchCurrentTodoAction({todoId})),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to match todoId with existing todo"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "todos/FETCH_CURRENT_TODO/pending",
        },
        Object {
          "type": "todos/FETCH_CURRENT_TODO/rejected",
        },
      ]
    `);
  });

  it('fetches current todo data without todoId parameter', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.todos.data = Mocks.todos;
      }),
    );

    await expect(
      store.dispatch(fetchCurrentTodoAction()),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"No todoId to fetchCurrentTodoAction"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "todos/FETCH_CURRENT_TODO/pending",
        },
        Object {
          "type": "todos/FETCH_CURRENT_TODO/rejected",
        },
      ]
    `);
  });
});
