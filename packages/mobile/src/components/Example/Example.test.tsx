import 'react-native';
import React from 'react';
import {render, waitFor} from 'src/test/testing-library';
import Example from '.';
import * as Mocks from '../../mocks';
import {getMockState} from 'src/test/utils';

// In this example we show how to combine
// the knowledge adquired in Class 2 with
// the render method from RTL.
it('renders number of users correctly', async () => {
  // First we define the initial state by
  // passing our users list mock
  const initialState = getMockState(draft => {
    draft.user.data = Mocks.users;
  });
  // Then we pass this initial state to the render
  // method, so our mocked state can feed our component
  // and create the scenario we are looking for
  const {getByText, mockStore} = render(<Example />, {
    initialState,
  });
  const store = mockStore.store.getState();

  await waitFor(() => {
    expect(store.user.data).toEqual(Mocks.users);
    getByText(`Users: ${store.user.data.length}`);
  });
});

it('renders number of users correctly', async () => {
  const {getByText, mockStore} = render(<Example />);

  await waitFor(() => {
    const store = mockStore.store.getState();

    expect(store.user.data).toEqual(Mocks.users);
    getByText(`Users: ${store.user.data.length}`);
  });

  // Here we are checking that the FETCH_USERS action was called and it passed fulfilled
  await waitFor(() => {
    expect(mockStore.getActionTypes()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "users/FETCH_USERS/pending",
        },
        Object {
          "type": "users/FETCH_USERS/fulfilled",
        },
      ]
    `);
  });
});
