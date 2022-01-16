module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        flesh: "#F49F85",
        purple: "#AD1FEA",
        "sky-blue": "#62BCFA",
        "ocean-blue": "#4661E6",
        "dark-grey-blue": "#647196",
        indigo: "#3A4374",
        "dark-indigo": "#373F68",
        "rice-white": "#F7F8FD",
        "moderate-rice-white": "#F2F4FF",
        red: "#D73737",
        cyan: "#62BCFA",
        orange: "#F49F85",
        hover: "#CFD7FF",
      },
      textColor: {
        flesh: "#F49F85",
        purple: "#AD1FEA",
        "sky-blue": "#62BCFA",
        "ocean-blue": "#4661E6",
        "dark-grey-blue": "#647196",
        indigo: "#3A4374",
        "dark-indigo": "#373F68",
        "rice-white": "#F7F8FD",
        "moderate-rice-white": "#F2F4FF",
      },
      borderColor: {
        flesh: "#F49F85",
        purple: "#AD1FEA",
        "sky-blue": "#62BCFA",
        "ocean-blue": "#4661E6",
        "dark-grey-blue": "#647196",
        indigo: "#3A4374",
        "dark-indigo": "#373F68",
        "rice-white": "#F7F8FD",
        "moderate-rice-white": "#F2F4FF",
        cyan: "#62BCFA",
        orange: "#F49F85",
      },
      backgroundImage: {
        "m-header":
          "url('../public/assets/suggestions/mobile/background-header.png')",
        "t-header":
          "url('../public/assets/suggestions/tablet/background-header.png')",
        "d-header":
          "url('../public/assets/suggestions/desktop/background-header.png')",
      },
      screens: {
        t: "768px",
        d: "1100px",
      },
    },
  },
  plugins: [],
};
