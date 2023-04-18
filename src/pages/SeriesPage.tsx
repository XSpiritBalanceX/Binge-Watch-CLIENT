import React from "react";
import { useParams } from "react-router-dom";
import { useSeriesFetch } from "@/hooks/useCatalogFetch";
import { urlToCatalog } from "@/components/fetchWrapper";
import { Spinner, Button } from "react-bootstrap";
import CardItem from "@/components/CardItem";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";
import "@/styles/SeriesPage.scss";

const SeriesPage = () => {
  const params = useParams();
  const seriesID = params.id as string;
  const { data, loading, error } = useSeriesFetch(urlToCatalog, seriesID);
  const isLogin = useTypedSelector(userSelectors.isLoginSelect);

  return (
    <React.Fragment>
      {error && <div className="errorDiv">Упс... Что-то пошло не так</div>}
      {loading && (
        <Spinner animation="border" variant="light" className="spiner" />
      )}
      {data && (
        <div className="containerSeriesPage">
          <>
            <CardItem infoSeries={data} />
            {isLogin && (
              <div className="buttonSeries">
                <Button variant="outline-info">Посмотрел</Button>
                <Button variant="outline-info">Хочу посмотреть</Button>
              </div>
            )}
          </>
        </div>
      )}
    </React.Fragment>
  );
};

export default SeriesPage;
