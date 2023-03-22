import React from "react";
import { useParams } from "react-router-dom";
import { useSeriesFetch } from "@/hooks/useCatalogFetch";
import queryString from "query-string";
import { APIRouters } from "@/components/fetchWrapper";
import { toast } from "react-toastify";
import { Spinner, Button } from "react-bootstrap";
import CardItem from "@/components/CardItem";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import * as userSelectors from "@/store/selectors";
import "@/styles/SeriesPage.scss";

const SeriesPage = () => {
  const params = useParams();
  const seriesID: string | undefined = params.id;
  const urlSeries: string = queryString.stringifyUrl({
    url: APIRouters.allCatalog + "/" + seriesID,
  });
  const { data, loading, error } = useSeriesFetch(urlSeries);
  if (error) {
    toast.error(error);
  }
  const isLogin = useTypedSelector(userSelectors.isLoginSelect);
  return (
    <React.Fragment>
      {loading ? (
        <Spinner animation="border" variant="light" className="spiner" />
      ) : (
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
