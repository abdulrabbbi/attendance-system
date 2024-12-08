/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs", // For EJS templates in the `views` folder
    "./public/**/*.html", // For any static HTML files in `public`
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
