import React, { useState, useEffect } from "react";
import { fetchWrapper } from "@/components/fetchWrapper";
import "@/styles/CatalogPage.scss";
import CatalogItem from "@/components/CatalogItem";
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
  const genrePageCatalog: string | undefined = params.name;

  useEffect(() => {
    (async function () {
      const dataSeries = (await fetchWrapper.getAllSeries(
        genrePageCatalog
      )) as AllSeries[];
      setSeries(dataSeries);
      setLoading(false);
    })();
  }, [isLoading, genrePageCatalog]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner animation="border" variant="light" className="spiner" />
      ) : (
        <div className="containerCatalog">
          <div className="menuCatalog">
            <MenuInCatalog />
          </div>
          <div className="contentCatalog">
            {series.map((el) => {
              return <CatalogItem key={el.id} name={el.name} url={el.url} />;
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CatalogPage;
