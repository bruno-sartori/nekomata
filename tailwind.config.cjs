/* eslint-disable */

const { tailwindTransform } = require('postcss-lit');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./dist/*.js'],
    transform: {
      ts: tailwindTransform
    },
  }
}

