import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import React from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={"Homepage here"}></Route>
        <Route path="/signin" element={"SignIn page here"}></Route>
        <Route
          path="/announcements"
          element={"Announcements page here"}
        ></Route>
        <Route path="/students/:id" element={"Student profile page"}></Route>
        <Route path="/teacher/:id" element={"Teacher's dashboard"}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
