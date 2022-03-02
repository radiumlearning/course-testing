import 'react-native';
import React from 'react';
import {render, waitFor} from 'src/test/testing-library';
import Example from '.';
import * as Mocks from '../../mocks';

it.skip('renders correctly', async () => {
  const {getByText, mockStore} = render(<Example />);

  const store = mockStore.store.getState();
  getByText('Fetching...');

  await waitFor(() => {
    expect(store.user.data).toEqual(Mocks.users);
  });

  getByText('3');
});
