import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import { useTypedSelector } from "./hooks/useTypedSelector";

const App = () => {
  const { isLogin } = useTypedSelector((state) => state);
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          {isLogin && <Route path="/mypage" element={<MyPage />} />}
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
