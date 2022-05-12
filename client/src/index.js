import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { AuthProvider } from "./components/AuthContext";
import { DashboardProvider } from "./components/DashbordComponents/DashboardContext";
import { ReportProvider } from "./components/ReportCardComponents/ReportContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <ReportProvider>
          <App />
        </ReportProvider>
      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>
);
