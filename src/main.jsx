import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NotificationProvider from "./components/global.components/notification.component/notificationProvider.component.jsx";
import { GlobalLoadingProvider } from "./components/global.components/loading.component/loading.component.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <GlobalLoadingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalLoadingProvider>
    </NotificationProvider>
  </StrictMode>
);
