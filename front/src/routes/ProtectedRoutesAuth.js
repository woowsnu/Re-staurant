import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ProtectedRoutesAuth = () => {
  const ctx = useContext(AuthContext);

  return ctx.isLoggedIn ? <Navigate to="/mypage" /> : <Outlet/>;

};

export default ProtectedRoutesAuth;