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
  cbUpdateSeason: (id: string, numberSeason: number) => void;
  cbHandleClickUpdate: () => void;
  cbDeleteSeries: (id: string, paramReq: string) => void;
}

const ViewdSeries = ({
  info,
  cbUpdateSeason,
  cbHandleClickUpdate,
  cbDeleteSeries,
}: ViewdSeriesProps) => {
  const [numberSeason, setNumberSeason] = useState<number>(
    info.bwlistsusers.numberofseason
  );
  const newSeasons =
    info.dateofnewseason === "закрыт"
      ? "Сериал закрыт"
      : `Дата выхода ${info.seasons + 1} сезона - ${info.dateofnewseason}`;

  const handleChangeSeason = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberOfSeason = Number(e.currentTarget.value);
    setNumberSeason(numberOfSeason);
    cbUpdateSeason(info.id, numberOfSeason);
  };

  const handleClickDeleteSeries = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    await cbDeleteSeries(info.id, e.currentTarget.name);
    cbHandleClickUpdate();
  };
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
            name={info.id}
            onChange={handleChangeSeason}
          />
          <Button
            name="delete"
            className="deleteButton"
            variant="outline-danger"
            onClick={handleClickDeleteSeries}
          >
            <i className="bi bi-trash3-fill"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ViewdSeries;
