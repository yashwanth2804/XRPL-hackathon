/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//     colors: {
//       ...colors,

//       brand: "#497174",
//       bgcolor: "#F4F4F4",
//       bgcolorSec: "#F2F2F2",
//       stroke: "#DFDFDF",
//       headingColor: "#497174",
//     },
//   },
//   plugins: [],
// };

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,

      brand: "#497174",
      bgcolor: "#F4F4F4",
      bgcolorSec: "#F2F2F2",
      stroke: "#DFDFDF",
      headingColor: "#497174",
    },
  },
  plugins: [require("flowbite/plugin")],
});
