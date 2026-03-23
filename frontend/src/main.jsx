import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { PortfolioProvider } from "./features/portfolio/portfolio.context";
import { ContactProvider } from "./features/contact/contact.context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PortfolioProvider>
      <ContactProvider>
        <RouterProvider router={router} />
      </ContactProvider>
    </PortfolioProvider>
  </React.StrictMode>
);
