import styled from "styled-components";
import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate replace to="/signIn" />;
};

export default PrivateRoute;
