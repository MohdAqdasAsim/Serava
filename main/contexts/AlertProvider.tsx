// src/contexts/AlertProvider.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

type AlertType = "success" | "error" | "info" | "warning";

interface AlertContextType {
  alertMessage: string;
  alertType: AlertType;
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType>({
  alertMessage: "",
  alertType: "info",
  showAlert: () => {},
  hideAlert: () => {},
});

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<AlertType>("info");

  const showAlert = (message: string, type: AlertType) => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const hideAlert = () => {
    setAlertMessage("");
    setAlertType("info");
  };

  return (
    <AlertContext.Provider
      value={{ alertMessage, alertType, showAlert, hideAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
