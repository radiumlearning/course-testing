import {rest} from 'msw';
import {server} from 'src/mocks/server';
import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';
import {getMockState, getMockStore} from 'src/test/utils';
import * as Mocks from 'src/mocks';

import {fetchUsersAction} from './fetchUsers';

describe('users/FETCH_USERS', () => {
  it('fetches user data', async () => {
    const {store, getActionTypes} = getMockStore();

    expect(store.getState().user.data).toEqual([]);

    await expect(store.dispatch(fetchUsersAction())).resolves.toMatchObject({
      payload: Mocks.users,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "users/FETCH_USERS/pending",
        },
        Object {
          "type": "users/FETCH_USERS/fulfilled",
        },
      ]
    `);

    expect(store.getState().user.data).toEqual(Mocks.users);
  });

  it('rejects if API fails', async () => {
    const {store, getActionTypes} = getMockStore();

    server.use(
      rest.get(`${BASE_API_URL}/users`, (_, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    await expect(
      store.dispatch(fetchUsersAction()),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Request failed with status code 400"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "users/FETCH_USERS/pending",
        },
        Object {
          "type": "users/FETCH_USERS/rejected",
        },
      ]
    `);

    expect(store.getState().user.data).toEqual([]);
  });

  it('skips if user data is already loaded', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.user.data = Mocks.users;
      }),
    );

    await expect(store.dispatch(fetchUsersAction())).resolves.toMatchObject({
      payload: undefined,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`Array []`);
  });
});
