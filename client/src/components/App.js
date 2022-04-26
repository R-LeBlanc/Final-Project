import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import React from "react";

import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./HomePage";
import Announcements from "./Announcements";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/announcements" element={<Announcements />}></Route>
        <Route path="/students/:id" element={"Student profile page"}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
