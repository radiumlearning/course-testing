import {rest} from 'msw';
import {server} from 'src/mocks/server';
import {BASE_API_URL} from '@rn-testing-class/lib/config/mobile';
import {getMockState, getMockStore} from 'src/test/utils';
import * as Mocks from 'src/mocks';

import {fetchExampleAction} from './fetchExample';

describe('example/FETCH_EXAMPLE', () => {
  it('fetches example data', async () => {
    const {store, getActionTypes} = getMockStore();

    expect(store.getState().example.data).toEqual([]);

    await expect(store.dispatch(fetchExampleAction())).resolves.toMatchObject({
      payload: Mocks.users,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "example/FETCH_EXAMPLE/pending",
        },
        Object {
          "type": "example/FETCH_EXAMPLE/fulfilled",
        },
      ]
    `);

    expect(store.getState().example.data).toEqual(Mocks.users);
  });

  it('rejects if API fails', async () => {
    const {store, getActionTypes} = getMockStore();

    server.use(
      rest.get(`${BASE_API_URL}/users`, (_, res, ctx) => {
        return res(ctx.status(400));
      }),
    );

    await expect(
      store.dispatch(fetchExampleAction()),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Request failed with status code 400"`,
    );

    expect(getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "example/FETCH_EXAMPLE/pending",
        },
        Object {
          "type": "example/FETCH_EXAMPLE/rejected",
        },
      ]
    `);

    expect(store.getState().example.data).toEqual([]);
  });

  it('skips if example data is already loaded', async () => {
    const {store, getActionTypes} = getMockStore(
      getMockState(draft => {
        draft.example.data = Mocks.users;
      }),
    );

    await expect(store.dispatch(fetchExampleAction())).resolves.toMatchObject({
      payload: undefined,
    });

    expect(getActionTypes()).toMatchInlineSnapshot(`Array []`);
  });
});
