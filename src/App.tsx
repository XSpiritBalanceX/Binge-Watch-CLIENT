import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "@/components/Navbar";
import AuthPage from "@/pages/AuthPage";
import MainPage from "@/pages/MainPage";
import MyPage from "@/pages/MyPage";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CatalogPage from "@/pages/CatalogPage";
import SeriesPage from "./pages/SeriesPage";

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
          <Route path="/registration" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/catalog/:name" element={<CatalogPage />} />
          <Route path="/series/:id" element={<SeriesPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
