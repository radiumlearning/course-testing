import 'react-native';
import React from 'react';
import {render, waitFor} from 'src/test/testing-library';
import Example from '.';

it('renders correctly', async () => {
  const {getByText, mockStore} = render(<Example />);

  const store = mockStore.store.getState();
  console.log('store example: ', store);

  await waitFor(() => {
    expect(store.example.data).toEqual([]);
  });
  getByText('This is a Test!');
});
