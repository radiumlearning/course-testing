import {getMockState, getMockStore} from 'src/test/utils';
import * as Mocks from 'src/mocks';

import {fetchCurrentUserAction} from './fetchCurrentUser';

describe('user/FETCH_CURRENT_USER', () => {
  it('fetches user data for the given userId parameter', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.user.data = Mocks.users;
      }),
    );

    const userId = 4138;

    await expect(
      store.dispatch(fetchCurrentUserAction({userId})),
    ).resolves.toMatchObject({
      payload: Mocks.user,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "example/FETCH_CURRENT_USER/pending",
        },
        Object {
          "type": "example/FETCH_CURRENT_USER/fulfilled",
        },
      ]
    `);
  });

  it('fetches current user data with unexistent userId', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.user.data = Mocks.users;
      }),
    );

    const userId = 4139;

    await expect(
      store.dispatch(fetchCurrentUserAction({userId})),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Unable to match userId with existing user"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "example/FETCH_CURRENT_USER/pending",
        },
        Object {
          "type": "example/FETCH_CURRENT_USER/rejected",
        },
      ]
    `);
  });

  it('fetches current user data without userId parameter', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.user.data = Mocks.users;
      }),
    );

    await expect(
      store.dispatch(fetchCurrentUserAction()),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"No userId to fetchCurrentUserAction"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "example/FETCH_CURRENT_USER/pending",
        },
        Object {
          "type": "example/FETCH_CURRENT_USER/rejected",
        },
      ]
    `);
  });
});
