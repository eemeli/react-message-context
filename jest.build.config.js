module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['lib/index.js'],
  moduleNameMapper: {
    'react-message-context': '<rootDir>/lib/index.js'
  },
  testMatch: ['**/tests/*.js']
}
