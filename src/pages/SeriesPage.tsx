import React from "react";
import { useParams } from "react-router-dom";
import { useSeriesFetch } from "@/hooks/useCatalogFetch";
import { urlToCatalog } from "@/components/fetchWrapper";
import { Spinner } from "react-bootstrap";
import CardItem from "@/components/CardItem";
import "@/styles/SeriesPage.scss";
import AddButton from "@/components/AddButton";

const SeriesPage = () => {
  const params = useParams();
  const seriesID = params.id as string;
  const { data, loading, error } = useSeriesFetch(urlToCatalog, seriesID);

  return (
    <React.Fragment>
      {error && <div className="errorDiv">Упс... Что-то пошло не так</div>}
      {loading && (
        <Spinner animation="border" variant="light" className="spiner" />
      )}
      {data && (
        <div className="containerSeriesPage">
          <CardItem infoSeries={data} />
          <AddButton />
        </div>
      )}
    </React.Fragment>
  );
};

export default SeriesPage;
