import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./routes/AuthPage";
import LogIn from "./component/Auth/LogIn";
import MyPage from "./routes/MyPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProtectedRoutesAuth from "./routes/ProtectedRoutesAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
          <Route element={<ProtectedRoutesAuth />}>
            <Route path="/members" element={<AuthPage />} />
            <Route path="/login" element={<LogIn />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
