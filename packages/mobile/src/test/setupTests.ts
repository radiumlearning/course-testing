/**
 * Jest Setup File
 *
 * Automatically run before each test file to setup the global environment.
 *
 */
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import {server} from 'src/mocks/server';

// global.__reanimatedWorkletInit = jest.fn();

beforeAll(() => server.listen({onUnhandledRequest: 'warn'}));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

// Removes warning: https://stackoverflow.com/a/59593847/1510454
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  return {
    KeyboardAwareScrollView: jest
      .fn()
      .mockImplementation(({children}) => children),
  };
});

jest.mock('@react-navigation/native', () => ({
  ...(jest.requireActual('@react-navigation/native') as any),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {},
  })),
}));

// https://bleepcoder.com/react-native-testing-library/620349890/error-for-every-fireevent-changing-state-in-a-component-with
jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
  const mockComponent = jest.requireActual('react-native/jest/mockComponent');
  return mockComponent('react-native/Libraries/Components/Switch/Switch');
});
