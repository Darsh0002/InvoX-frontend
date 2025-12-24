import React, { createContext, useState } from "react";
import { initialInvoiceData } from "../constants.js";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");

  const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const contextValue = {
    invoiceTitle,
    setInvoiceTitle,
    invoiceData,
    setInvoiceData,
    selectedTemplate,
    setSelectedTemplate,
    initialInvoiceData,
    baseURL,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
