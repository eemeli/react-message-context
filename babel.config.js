let modules
const plugins = ['@babel/plugin-proposal-class-properties']
const rmPropTypes = [
  'transform-react-remove-prop-types',
  { removeImport: true }
]

switch (process.env.NODE_ENV) {
  case 'ci':
  case 'test':
    modules = 'auto'
    break
  default:
    modules = false
    plugins.push(rmPropTypes)
}

module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true, modules }],
    '@babel/preset-react'
  ],
  plugins
}
