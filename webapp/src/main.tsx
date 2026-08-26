import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import { initTelegram } from "./lib/telegram";
import "./index.css";

// Call ready()/expand() as early as possible — before React even paints —
// so the WebView's viewport is settled before our first render.
initTelegram();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
