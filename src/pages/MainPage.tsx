import React from "react";
import TopTen from "@/components/TopTen";
import "@/styles/MainPage.scss";
import { Spinner } from "react-bootstrap";
import { useMainPageFetch } from "@/hooks/useCatalogFetch";

const MainPage = () => {
  const { data, error, loading } = useMainPageFetch(
    "http://localhost:5000/api/series"
  );
  return (
    <React.Fragment>
      {error ? (
        <div className="errorDiv">Упс... Что-то пошло не так</div>
      ) : loading ? (
        <Spinner animation="border" variant="light" className="spiner" />
      ) : (
        <div className="MainPageContainer">
          <TopTen />
          <div>Новинки</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MainPage;
