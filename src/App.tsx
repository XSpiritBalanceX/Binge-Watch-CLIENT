import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/registration" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
