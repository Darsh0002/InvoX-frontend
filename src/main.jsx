import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContext, AppContextProvider } from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
