import React, { useState, useEffect } from "react";
import { fetchWrapper } from "@/components/fetchWrapper";
import "@/styles/CatalogPage.scss";
import SeriesInCatalog from "@/components/SeriesInCatalog";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MenuInCatalog from "@/components/MenuInCatalog";

interface AllSeries {
  id: number;
  name: string;
  url: string;
  year: number;
  seasons: number;
  genre: string;
  description: string;
  dateofnewseason: string;
}

const CatalogPage = () => {
  const [series, setSeries] = useState<[] | AllSeries[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const params = useParams();
  const namePageCatalog: string | undefined = params.name;

  useEffect(() => {
    (async function () {
      const dataSeries = (await fetchWrapper.getAllSeries()) as AllSeries[];
      setSeries(dataSeries);
      setLoading(false);
    })();
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner animation="border" variant="light" className="spiner" />
      ) : (
        <div className="containerCatalog">
          <div className="menuCatalog">{<MenuInCatalog />}</div>
          <div className="contentCatalog">
            {series.map((el) => {
              return (
                <SeriesInCatalog key={el.id} name={el.name} url={el.url} />
              );
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CatalogPage;
