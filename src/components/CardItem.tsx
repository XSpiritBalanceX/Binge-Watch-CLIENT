import React from "react";
import { AllSeries } from "@/hooks/useCatalogFetch";
import "@/styles/SeriesPage.scss";

interface InfoSeriesProps {
  infoSeries: AllSeries;
}

const CardItem = ({ infoSeries }: InfoSeriesProps) => {
  const newSeasons =
    infoSeries.dateofnewseason === "закрыт"
      ? "Сериал закрыт"
      : `Дата выхода ${infoSeries.seasons + 1} сезона - ${
          infoSeries.dateofnewseason
        }`;

  return (
    <div className="containerCard">
      <h3>
        {infoSeries.name}, <span>{infoSeries.year} г.</span>
      </h3>
      <img src={infoSeries.urlscreen} title={infoSeries.name} />
      <p>Жанр - {infoSeries.genre}</p>
      <p>Количество сезонов - {infoSeries.seasons}</p>
      <p>{newSeasons}</p>
      <p>{infoSeries.description}</p>
    </div>
  );
};

export default CardItem;
