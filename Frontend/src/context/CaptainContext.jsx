import React, { createContext, useState } from "react";

export const CaptainDataContext = createContext();
function CaptainContext({ children }) {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setLoading,
    error,
    setError,
    updateCaptain,
  };
  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
}

export default CaptainContext;
