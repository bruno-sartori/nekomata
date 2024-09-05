/* eslint-disable */

module.exports = {
  syntax: 'postcss-lit',
  plugins: {
    tailwindcss: {
      config: './tailwindcss.config.cjs'
    },
    /*autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})*/
  },
}
