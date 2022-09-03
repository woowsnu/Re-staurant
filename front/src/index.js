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
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import ReviewWrite from "./component/Review/ReviewWrite";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
            <Route path="/members" element={<AuthPage />} />
            <Route path="/detail/:id" element={<RestaurantDetailPage />} />
          <Route element={<ProtectedRoutesAuth />}>
            <Route path="/login" element={<LogIn />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/review/write/:id" element={<ReviewWrite />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);