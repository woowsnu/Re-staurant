import React from "react";
import SignUp from "../component/Auth/SignUp";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import MyPage from "../routes/MyPage";

const AuthPage = () => {
  const ctx = useContext(AuthContext);
  const loginStatus = ctx.isLoggedIn;

  return <>{loginStatus ? <MyPage /> : <SignUp />}</>;
};

export default AuthPage;