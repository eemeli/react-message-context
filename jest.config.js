module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    'react-message-context': '<rootDir>/src/index.ts'
  },
  testMatch: ['**/tests/*.js']
}
