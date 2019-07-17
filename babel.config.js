let modules = process.env.BABEL_TGT || false
if (process.env.NODE_ENV === 'test') modules = 'auto'

module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true, modules }],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['transform-react-remove-prop-types', { removeImport: true }]
  ]
}
