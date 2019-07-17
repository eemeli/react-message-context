let modules
const plugins = ['@babel/plugin-proposal-class-properties']
const rmPropTypes = [
  'transform-react-remove-prop-types',
  { removeImport: true }
]

switch (process.env.NODE_ENV) {
  case 'cjs':
    modules = 'auto'
    plugins.push(rmPropTypes)
    break
  case 'esm':
    modules = false
    plugins.push(rmPropTypes)
    break
  case 'ci':
  case 'test':
    modules = 'auto'
    break
  default:
    throw new Error('NODE_ENV is required')
}

module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true, modules }],
    '@babel/preset-react'
  ],
  plugins
}
