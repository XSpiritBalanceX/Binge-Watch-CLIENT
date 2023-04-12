import { Route, Routes, Navigate } from "react-router-dom";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";
import AuthPage from "@/pages/AuthPage";
import MainPage from "@/pages/MainPage";
import MyPage from "@/pages/MyPage";
import CatalogPage from "@/pages/CatalogPage";
import SeriesPage from "@/pages/SeriesPage";

const RoutesComponent = () => {
  const isLogin = useTypedSelector(userSelectors.isLoginSelect);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {isLogin && <Route path="/mypage" element={<MyPage />} />}
      <Route path="/registration" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/catalog/:name" element={<CatalogPage />} />
      <Route path="/series/:id" element={<SeriesPage />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default RoutesComponent;
