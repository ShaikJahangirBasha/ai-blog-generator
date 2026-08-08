import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { SidebarProvider } from "./context/SidebarContext";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { SettingsProvider } from "./context/SettingsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
  <SettingsProvider>
    <BlogProvider>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </BlogProvider>
  </SettingsProvider>
</AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);