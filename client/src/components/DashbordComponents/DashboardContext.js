import React, { useContext, useEffect, useState } from "react";

export const DashboardContext = React.createContext();

// const initialState = {
//     id: null,
//     students: null,
//     classes: null,
//     role: null,
//   };

// function reducer(state, action) {
//     switch(action.type) {
//         case "user-dashboard": {
//             return{
//                 ...state,
//                 id: action.id,
//                 students: action.students,
//                 classes: action.classes,
//                 role: action.role,
//             }
//         }
//     }
// }

export const DashboardProvider = ({ children }) => {
  const [userDashboard, setUserDashboard] = useState();
  const [usersStudents, setUsersStudents] = useState([]);
  //   const value = {
  //     userDashboard,
  //     setUserDashboard,
  //   };

  return (
    <DashboardContext.Provider
      value={{
        userDashboard,
        setUserDashboard,
        usersStudents,
        setUsersStudents,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
