import React from "react";
import { Card, Button } from "react-bootstrap";
import "@/styles/CatalogPage.scss";

interface SeriesProps {
  info: {
    name: string;
    url: string;
  };
}

const CatalogItem = ({ info }: SeriesProps) => {
  return (
    <Card className="cardSeries">
      <Card.Img variant="top" src={info.url} title={info.name} />
      <Card.Body>
        <Card.Title>{info.name}</Card.Title>
        <Button variant="primary">Посмотреть</Button>
      </Card.Body>
    </Card>
  );
};

export default CatalogItem;
