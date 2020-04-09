require('dotenv').config();

module.exports = {
  projects: [
    {
      displayName: 'unit',
      roots: [
        '<rootDir>/src',
      ],
      setupFilesAfterEnv: [
        './jest.setup.js',
      ],
      testRegex: '((\\.|/)(test|spec))\\.jsx?$',
      collectCoverage: true,
      coverageThreshold: {
        './src/': {
          statements: 90,
        },
      },
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: [
        '<rootDir>/**/*.js',
      ],
    },
  ],
};
