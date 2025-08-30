
// import React from "react";
// import { ThemeProvider as StyledThemeProvider } from "styled-components";
// import { ThemeProvider, useTheme } from "../context/ThemeContext";

// const lightTheme = {
//   cardBg: "#ffffff",
//   text: "#000000",   // black text
// };

// const darkTheme = {
//   cardBg: "#1f2937", // dark gray background
//   text: "#ffffff",   // white text
// };

// const ThemeBridge = ({ children }: { children: React.ReactNode }) => {
//   const { theme } = useTheme();
//   return (
//     <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
//       {children}
//     </StyledThemeProvider>
//   );
// };

// export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider>
//       <ThemeBridge>{children}</ThemeBridge>
//     </ThemeProvider>
//   );
// }


import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { GlobalStyle } from "../context/GlobalStyle";

const lightTheme = {
  bodyBg: "#f9fafb",
  cardBg: "#ffffff",
  text: "#000000",
  inputBg: "#ffffff",
  border: "#d1d5db",
};

const darkTheme = {
  bodyBg: "#111827",
  cardBg: "#1f2937",
  text: "#ffffff",
  inputBg: "#374151",
  border: "#4b5563",
};

const ThemeBridge = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={activeTheme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ThemeBridge>{children}</ThemeBridge>
    </ThemeProvider>
  );
}
