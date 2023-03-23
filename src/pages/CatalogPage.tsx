import React from "react";
import "@/styles/CatalogPage.scss";
import CatalogItem from "@/components/CatalogItem";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import MenuInCatalog from "@/components/MenuInCatalog";
import { useCatalogFetch } from "@/hooks/useCatalogFetch";
import { urlToCatalog } from "@/components/fetchWrapper";

const CatalogPage = () => {
  const params = useParams();
  const genrePageCatalog = params.name as string;
  const navigate = useNavigate();
  const { data, loading, error } = useCatalogFetch(
    urlToCatalog,
    genrePageCatalog
  );
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
        <div className="containerCatalog">
          <div className="menuCatalog">
            <MenuInCatalog />
          </div>
          <div className="contentCatalog">
            {data.map((el) => {
              return (
                <CatalogItem
                  key={el.id}
                  info={el}
                  cbGoToSeriesPage={goToSeriesPage}
                />
              );
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CatalogPage;
