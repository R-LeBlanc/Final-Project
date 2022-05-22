import React, { useState } from "react";

export const ReportContext = React.createContext();

export const ReportProvider = ({ children }) => {
  const [grades, setGrades] = useState();
  const [allClasses, setAllClasses] = useState([]);
  const [selectedReport, setSelectedReport] = useState([]);

  return (
    <ReportContext.Provider
      value={{
        grades,
        setGrades,
        allClasses,
        setAllClasses,
        selectedReport,
        setSelectedReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
