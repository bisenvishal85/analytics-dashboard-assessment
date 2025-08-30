import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(p: any) => p.theme.bodyBg};
    color: ${(p: any) => p.theme.text};
    font-family: "Inter", Arial, sans-serif;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  input, button, select, textarea {
    color: ${(p: any) => p.theme.text};
    background-color: ${(p: any) => p.theme.inputBg};
    border: 1px solid ${(p: any) => p.theme.border};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  button {
    cursor: pointer;
  }
`;
