/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**/*.tsx',
    './index.html',
    './src/components/pages/*.tsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
  ,
}
