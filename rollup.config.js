import babel from '@rollup/plugin-babel'

export default {
  input: 'src/index.js',
  output: { file: 'index.js' },
  external: ['react'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', { loose: true, modules: false }],
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        ['transform-react-remove-prop-types', { removeImport: true }]
      ]
    })
  ]
}
