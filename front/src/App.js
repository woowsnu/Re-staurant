import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./routes/AuthPage";
import LogIn from "./component/Auth/LogIn";
import MyPage from "./routes/MyPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProtectedRoutesAuth from "./routes/ProtectedRoutesAuth";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import ReviewWrite from "./component/Review/ReviewWrite";
import HomePage from "./routes/HomePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<App />} />
          <Route path="/detail/:id" element={<RestaurantDetailPage />} />
          <Route element={<ProtectedRoutesAuth />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/members" element={<AuthPage />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/review/write/:id" element={<ReviewWrite />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
