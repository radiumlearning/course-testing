module.exports = {
  projects: ['<rootDir>/packages/**/jest.config.js'],
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
