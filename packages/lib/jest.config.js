const {name} = require('./package.json');

module.exports = {
  displayName: name,
  name,
  preset: 'react-native',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    'coverage',
    'components',
    'interfaces',
    'index.ts',
    'jest.config.js',
    'babel.config.js',
  ],
};
