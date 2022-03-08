import {rest} from 'msw';
import {server} from 'src/mocks/server';
import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';
import {getMockStore} from 'src/test/utils';
import * as Mocks from 'src/mocks';

import {fetchActiveUsersAction} from './fetchActiveUsers';

describe('users/FETCH_ACTIVE_USERS', () => {
  it('fetches active users', async () => {
    const activeUsersMock = Mocks.users.filter(
      user => user.status === 'active',
    );

    const {store, getActionTypes} = getMockStore();

    expect(store.getState().user.activeUsers.data).toEqual([]);

    await expect(
      store.dispatch(fetchActiveUsersAction()),
    ).resolves.toMatchObject({
      payload: Mocks.users.filter(user => user.status === 'active'),
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "users/FETCH_ACTIVE_USERS/pending",
        },
        Object {
          "type": "users/FETCH_ACTIVE_USERS/fulfilled",
        },
      ]
    `);

    expect(store.getState().user.activeUsers.data).toEqual(activeUsersMock);
  });

  it('rejects if API fails', async () => {
    const {store, getActionTypes} = getMockStore();

    server.use(
      rest.get(`${BASE_API_URL}/users`, (_, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    await expect(
      store.dispatch(fetchActiveUsersAction()),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Request failed with status code 400"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "users/FETCH_ACTIVE_USERS/pending",
        },
        Object {
          "type": "users/FETCH_ACTIVE_USERS/rejected",
        },
      ]
    `);

    expect(store.getState().user.activeUsers.data).toEqual([]);
  });
});
