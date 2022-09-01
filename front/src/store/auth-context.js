import { createContext, useState } from "react";
import React from "react";

const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [auth, setAuth] = useState(false);
  if (localStorage.getItem("token") !== null) {
    setAuth(true);
  }
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
