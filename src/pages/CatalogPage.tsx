import React, { useState, useEffect } from "react";
import { fetchWrapper } from "@/components/fetchWrapper";
import "@/styles/CatalogPage.scss";

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

  useEffect(() => {
    (async function () {
      const dataSeries = (await fetchWrapper.getAllSeries()) as AllSeries[];
      setSeries(dataSeries);
    })();
  }, []);

  return (
    <div className="containerCatalog">
      <div className="menuCatalog">menu</div>
      <div className="contentCatalog">series</div>
    </div>
  );
};

export default CatalogPage;
