import babel from 'rollup-plugin-babel'

export default {
  input: 'src/get.js',
  output: [
    {
      file: 'dist/get.common.js',
      format: 'cjs'
    }, {
      file: 'dist/get.esm.js',
      format: 'es'
    }, {
      file: 'dist/get.js',
      format: 'umd',
      name: 'get'
    }
  ],
  plugins: [
    babel()
  ]
}
