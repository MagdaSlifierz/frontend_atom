import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    green: {
      500: "#38A169",
    },
    purple: {
      500: "#9B51E0",
    },
  },
  fonts: {
    body: `'Raleway', sans-serif`,
    heading:`'Open Sans', sans-serif`,
  },
});

export default theme;