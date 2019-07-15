module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: process.env.BABEL_TGT || false
      }
    ],
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-proposal-class-properties']
}
