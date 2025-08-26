import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";   // ✅ import App.jsx here
import "./index.css";          // optional if you have styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
