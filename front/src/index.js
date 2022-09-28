import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {AuthContextProvider} from "./store/auth-context";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import AuthPage from "./routes/AuthPage";
import LogIn from "./component/Auth/LogIn";
import MyPage from "./routes/MyPage";
import MyPageView from "./routes/MyPageView";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProtectedRoutesAuth from "./routes/ProtectedRoutesAuth";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import ReviewWritePage from "./routes/ReviewWritePage";
import Admin from "./routes/Admin";
import RestaurantSearch from "./routes/RestaurantSearch";
import HomePage from "./routes/HomePage";
import { ResContextProvider } from "./store/res-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
    <ResContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/search/:id" element={<RestaurantSearch />} />
        <Route path="/detail/:id" element={<RestaurantDetailPage />} />
        <Route path="/mypage/:nickName" element={<MyPageView />} />
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
      </ResContextProvider>
    </AuthContextProvider>
);