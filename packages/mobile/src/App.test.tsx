import 'react-native';
import React from 'react';
import {fireEvent, waitFor} from '@testing-library/react-native';
import Toast from 'react-native-simple-toast';
import {render} from '@testing-library/react-native';
import App from './App';

describe('App.tsx', () => {
  describe('getBy - Exactly one element', () => {
    it('Example 1 - Text should be visible', () => {
      const {getByText, getByTestId} = render(<App showHiddenText={false} />);

      const text = getByText('Hi!');
      const textWithTestId = getByTestId('textExample');

      // const exampleText = getByText("Example Text");

      expect(text).toBeTruthy();
      expect(textWithTestId).toBeTruthy();
    });
  });
  describe('queryAll one or multiple elements / queryBy - None, one or multiple elements', () => {
    it('Example 2 - Multiple `Example Text` should be visible', () => {
      const {queryAllByText} = render(<App showHiddenText={false} />);

      const exampleText = queryAllByText('Example Text');

      expect(exampleText).toBeTruthy();

      expect(exampleText).toHaveLength(2);
    });
    it('Example 3 - Hides text when showHiddenText is false', () => {
      const {queryByTestId} = render(<App showHiddenText={false} />);

      const hiddenText = queryByTestId('hiddenText');

      expect(hiddenText).toBeFalsy();
    });
    it('Example 4 - Shows text when showHiddenText is true', () => {
      const {queryByTestId} = render(<App showHiddenText={true} />);

      const hiddenText = queryByTestId('hiddenText');

      expect(hiddenText).toBeTruthy();
    });
  });
  describe('fireEvent', () => {
    it('Example 5 - Only show 1 `Hi!` if button is not pressed', () => {
      const {getByText, queryAllByText} = render(
        <App showHiddenText={false} />,
      );

      const showTextButton = getByText('Show Text');

      const text = queryAllByText('Hi!');

      expect(text).toHaveLength(1);

      expect(showTextButton).toBeTruthy();
    });
    it('Example 6 - Show 2 `Hi!` when button is pressed', async () => {
      const {getByText, queryAllByText} = render(
        <App showHiddenText={false} />,
      );

      const showTextButton = getByText('Show Text');

      expect(showTextButton).toBeTruthy();

      fireEvent.press(showTextButton);

      const text = queryAllByText('Hi!');

      await waitFor(() => expect(text).toHaveLength(2));
    });
    it('Example 7 - Text input should have a placeholder', () => {
      const {getByTestId, queryByPlaceholderText} = render(
        <App showHiddenText={false} />,
      );

      const textInput = getByTestId('inputExample');
      // const textInput = queryByPlaceholderText("Placeholder text");

      expect(textInput.props.placeholder).toEqual('Placeholder text');
      // expect(textInput).toBeTruthy();
    });
    it('Example 8 - Text input should update its value', async () => {
      const {getByTestId} = render(<App showHiddenText={false} />);

      const textInput = getByTestId('inputExample');

      expect(textInput).toBeTruthy();
      expect(textInput.props.value).toEqual('');

      fireEvent.changeText(textInput, 'Lucía');

      await waitFor(() => expect(textInput.props.value).toEqual('Lucía'));
    });
  });

  describe('toast', () => {
    it('Example 7 - Show toast when pressing button', async () => {
      const mockShow = jest.fn();
      jest.spyOn(Toast, 'show').mockImplementationOnce(mockShow);

      const {getByText} = render(<App showHiddenText={false} />);

      const showTextButton = getByText('Show Toast');

      expect(showTextButton).toBeTruthy();

      fireEvent.press(showTextButton);

      await waitFor(() =>
        expect(mockShow).toHaveBeenCalledWith('Toast Message'),
      );
    });
  });
});
