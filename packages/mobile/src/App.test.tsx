import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import App from './App';

it('renders correctly', () => {
  const {getByText} = render(<App />);

  getByText('Read the docs to discover what to do next:');
});
