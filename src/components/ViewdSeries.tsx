import { BWListUser } from "@/hooks/useUserSeriesFetch";
import { Card, Button } from "react-bootstrap";
import "@/styles/MyPage.scss";
import { useState } from "react";

interface ViewdSeriesProps {
  info: {
    id: string;
    name: string;
    url: string;
    seasons: number;
    dateofnewseason: string;
    bwlistsusers: BWListUser;
  };
  cbAddSeries: (id: string, numberSeason: number, paramReq: string) => void;
}

const ViewdSeries = ({ info, cbAddSeries }: ViewdSeriesProps) => {
  const [numberSeason, setNumberSeason] = useState<number>(
    info.bwlistsusers.numberofseason
  );
  const newSeasons =
    info.dateofnewseason === "закрыт"
      ? "Сериал закрыт"
      : `Дата выхода ${info.seasons + 1} сезона - ${info.dateofnewseason}`;
  return (
    <Card className="CardUserSeries">
      <Card.Img
        variant="top"
        src={info.url}
        title={info.name}
        alt={info.name}
      />
      <Card.Body>
        <Card.Title>{info.name}</Card.Title>
        <p>{newSeasons}</p>
        <div className="directionAction">
          <input
            type="number"
            value={numberSeason}
            onChange={(e) => setNumberSeason(Number(e.target.value))}
          />
          <Button
            variant="outline-success"
            onClick={(e) => cbAddSeries(info.id, numberSeason, "watched")}
          >
            <i className="bi bi-check2"></i>
          </Button>
          <Button
            className="deleteButton"
            variant="outline-danger"
            onClick={(e) => console.log(info.id)}
          >
            <i className="bi bi-trash3-fill"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ViewdSeries;
