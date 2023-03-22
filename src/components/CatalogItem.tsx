import React from "react";
import { Card, Button } from "react-bootstrap";
import "@/styles/CatalogPage.scss";
import { AllSeries } from "@/hooks/useCatalogFetch";

interface SeriesProps {
  info: AllSeries;
  cbGoToSeriesPage: (id: number) => void;
}

const CatalogItem = ({ info, cbGoToSeriesPage }: SeriesProps) => {
  return (
    <Card className="cardSeries">
      <Card.Img variant="top" src={info.url} title={info.name} />
      <Card.Body>
        <Card.Title>{info.name}</Card.Title>
        <Button
          variant="outline-info"
          onClick={(e) => cbGoToSeriesPage(info.id as number)}
        >
          Посмотреть
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CatalogItem;
