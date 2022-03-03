import {rest} from 'msw';
import {server} from 'src/mocks/server';
import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';
import {getMockState, getMockStore} from 'src/test/utils';
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

    console.log(store.getState().user.activeUsers.data);

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
});
