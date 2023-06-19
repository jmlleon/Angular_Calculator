/** @type {import('tailwindcss').Config} */
module.exports = {

  important: true,
  
  content: [

    './src/**/*.{html,ts}' 
    // './projects/**/*.{html,ts}'

  ],
  theme: {
    extend: {},
  },
  plugins: [

    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer")
  ],
}
