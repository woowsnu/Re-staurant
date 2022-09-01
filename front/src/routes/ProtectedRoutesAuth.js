import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoutesAuth = () => {
  const token = !!localStorage.getItem("token")
  return token ? <Navigate to="/mypage" /> : <Outlet/>;

};

export default ProtectedRoutesAuth;