module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { loose: true, modules: 'auto', targets: { node: 'current' } }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
}
