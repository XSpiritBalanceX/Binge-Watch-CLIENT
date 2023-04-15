import React from "react";
import "@/styles/MainPage.scss";
import { Spinner } from "react-bootstrap";
import { useMainPageFetch } from "@/hooks/useCatalogFetch";
import MainItem from "@/components/MainItem";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useMainPageFetch();

  const goToSeriesPage = (id: string) => {
    navigate("/series/" + id);
  };

  return (
    <React.Fragment>
      {error ? (
        <div className="errorDiv">Упс... Что-то пошло не так</div>
      ) : loading ? (
        <Spinner animation="border" variant="light" className="spiner" />
      ) : (
        <div className="MainPageContainer">
          <div className="seriesContainer">
            <div className="topTenHeader">
              <h5>Топ сериалов </h5>
              <span>10</span>
            </div>
            {data.topTenSeries.map((el) => {
              return (
                <MainItem
                  key={el.id}
                  infoSeries={el}
                  cbGoToSeriesPage={goToSeriesPage}
                />
              );
            })}
          </div>
          <div className="latestSeriesContainer">
            <h5>Последние добавленные сериалы</h5>
            <div className="seriesContainer">
              {data.latestSeries.map((el) => {
                return (
                  <MainItem
                    key={el.id}
                    infoSeries={el}
                    cbGoToSeriesPage={goToSeriesPage}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MainPage;
