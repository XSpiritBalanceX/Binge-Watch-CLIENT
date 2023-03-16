import React from "react";
import { Card, Button } from "react-bootstrap";
import "@/styles/CatalogPage.scss";

interface SeriesProps {
  name: string;
  url: string;
}

const CatalogItem = ({ name, url }: SeriesProps) => {
  return (
    <Card className="cardSeries">
      <Card.Img variant="top" src={url} title={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button variant="primary">Посмотреть</Button>
      </Card.Body>
    </Card>
  );
};

export default CatalogItem;
