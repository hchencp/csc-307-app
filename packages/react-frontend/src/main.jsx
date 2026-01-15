// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp.jsx"; // 1. Change 'myApp' to 'MyApp' here
import "./main.css";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

// 2. Now this matches the import name above!
root.render(<MyApp />);
