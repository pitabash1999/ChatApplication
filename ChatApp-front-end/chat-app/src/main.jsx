import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./config/routes.jsx";
import { ChatProvider } from "./context/ChatProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChatProvider>
      <Toaster />
      <AppRoutes />
    </ChatProvider>
  </BrowserRouter>
);
