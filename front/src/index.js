import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {AuthContextProvider} from "./store/auth-context";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AuthPage from "./routes/AuthPage";
import LogIn from "./component/Auth/LogIn";
import MyPage from "./routes/MyPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProtectedRoutesAuth from "./routes/ProtectedRoutesAuth";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import ReviewWritePage from "./routes/ReviewWritePage";
import Admin from "./routes/Admin";
import RestaurantSearch from "./routes/RestaurantSearch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/search/:id" element={<RestaurantSearch />} />
        <Route path="/detail/:id" element={<RestaurantDetailPage />} />
        <Route path="/mypage/:useEmail" element={<MyPage />} />
        <Route element={<ProtectedRoutesAuth />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/members" element={<AuthPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/review/:id" element={<ReviewWritePage />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </AuthContextProvider>
);