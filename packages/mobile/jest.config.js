const {name} = require('./package.json');

module.exports = {
  displayName: name,
  name,
  preset: 'react-native',
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/src/test/setupTests.ts'],
  clearMocks: true,
  globals: {
    __DEV__: true,
  },
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['src/test'],
};
