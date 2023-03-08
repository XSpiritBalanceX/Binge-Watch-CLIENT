import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "@/components/Navbar";
import RegistrationPage from "@/pages/RegistrationPage";
import MainPage from "@/pages/MainPage";
import LoginPage from "@/pages/LoginPage";
import MyPage from "@/pages/MyPage";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const isLogin = useTypedSelector(userSelectors.isLoginSelect);
  return (
    <BrowserRouter>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="colored"
        />
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
