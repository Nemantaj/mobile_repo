import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const newTheme = createTheme({
  type: "light",
  theme: {
    fonts: {
      sans: 'money, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      mono: "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NextUIProvider theme={newTheme}>
      <App />
    </NextUIProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
