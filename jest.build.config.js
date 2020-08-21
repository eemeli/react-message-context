module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['index.js'],
  moduleNameMapper: {
    'react-message-context': '<rootDir>/index.js'
  },
  testMatch: ['**/tests/*.js']
}
