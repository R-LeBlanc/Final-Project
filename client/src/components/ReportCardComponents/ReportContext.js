import React, { useState } from "react";

export const ReportContext = React.createContext();

export const ReportProvider = ({ children }) => {
  const [grades, setGrades] = useState();
  const [allClasses, setAllClasses] = useState();

  return (
    <ReportContext.Provider
      value={{
        grades,
        setGrades,
        allClasses,
        setAllClasses,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
