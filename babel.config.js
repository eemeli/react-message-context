module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true, modules: 'auto' }],
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
}
