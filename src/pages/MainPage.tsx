import React from "react";
import TopTen from "@/components/TopTen";
import "@/styles/MainPage.scss";
import { Spinner } from "react-bootstrap";
import { useCatalogFetch } from "@/hooks/useCatalogFetch";
import { urlToCatalog } from "@/components/fetchWrapper";
import LatesAddedSeries from "@/components/LatesAddedSeries";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const genre = "сериалы";
  const { data, error, loading } = useCatalogFetch(urlToCatalog, genre);

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
          <TopTen />
          <div>
            <h5>Последние добавленные сериалы</h5>
            <div className="latestSeriesContainer">
              {data
                .map((el) => {
                  return (
                    <LatesAddedSeries
                      key={el.id}
                      infoSeries={el}
                      cbGoToSeriesPage={goToSeriesPage}
                    />
                  );
                })
                .slice(-10)}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MainPage;
