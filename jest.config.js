// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
const customJestConfig = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/index.{js,jsx,ts,tsx}',
    '!**/jest*',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.storybook/**',
    '!**/coverage/**',
    '!**/.next/**',
    '!**/.prettierrc.js',
    '!**/next.config.{js,ts}',
    '!**/data/**'
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      statements: 7,
      branches: 1,
      lines: 7,
      functions: 6,
    },
  },
  testEnvironment: 'jsdom',
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['node_modules', '.cache'],
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
