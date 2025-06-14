/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  // ✅ Enable coverage collection
  collectCoverage: true,

  // ✅ Include all TS/TSX files + explicitly include utility files like validate.ts
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/__tests__/**',
    'src/utils/validate.ts', // 👈 force coverage for validate utility
  ],

  // ✅ Output directory for coverage reports
  coverageDirectory: 'coverage',

  // ✅ Multiple formats for coverage reporting
  coverageReporters: ['text', 'text-summary', 'json', 'lcov'],

  // ✅ Module alias support
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // ✅ Setup file for test environment customization
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // ✅ Use Babel to process TS/TSX files (especially for JSX support)
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
};
