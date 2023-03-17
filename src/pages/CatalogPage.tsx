import React from "react";
import "@/styles/CatalogPage.scss";
import CatalogItem from "@/components/CatalogItem";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MenuInCatalog from "@/components/MenuInCatalog";
import useCatalogFetch from "@/hooks/useCatalogFetch";
import queryString from "query-string";
import { APIRouters } from "@/components/fetchWrapper";
import { toast } from "react-toastify";

const CatalogPage = () => {
  const params = useParams();
  const genrePageCatalog: string | undefined = params.name;
  const urlCatalog: string = queryString.stringifyUrl({
    url: APIRouters.allCatalog,
    query: { genre: genrePageCatalog },
  });
  const { data, loading, error } = useCatalogFetch(decodeURI(urlCatalog));
  if (error) {
    toast.error(error);
  }

  return (
    <React.Fragment>
      {loading ? (
        <Spinner animation="border" variant="light" className="spiner" />
      ) : (
        <div className="containerCatalog">
          <div className="menuCatalog">
            <MenuInCatalog />
          </div>
          <div className="contentCatalog">
            {data.map((el) => {
              return <CatalogItem key={el.id} info={el} />;
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CatalogPage;
