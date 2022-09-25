import React from "react";
<<<<<<< HEAD

const AuthPage = () => {
  return <div>AuthPage</div>;
=======
import SignUp from "../component/Auth/SignUp";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import MyPage from "../routes/MyPage";

const AuthPage = () => {
  const ctx = useContext(AuthContext);
  const loginStatus = ctx.isLoggedIn;

  return <>{loginStatus ? <MyPage /> : <SignUp />}</>;
>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33
};

export default AuthPage;