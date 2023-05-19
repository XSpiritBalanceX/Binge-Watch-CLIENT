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
  const { id, name, url, seasons, dateofnewseason, bwlistsusers } = info;

  const [numberSeason, setNumberSeason] = useState<number>(
    bwlistsusers.numberofseason
  );
  const dateOfNewSeasonsMessage =
    info.dateofnewseason === "закрыт"
      ? "Сериал закрыт"
      : `Дата выхода ${seasons + 1} сезона - ${dateofnewseason}`;

  const handleChangeSeason = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberOfSeason = Number(e.currentTarget.value);
    setNumberSeason(numberOfSeason);
    cbUpdateSeason(id, numberOfSeason);
  };

  const handleClickDeleteSeries = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    await cbDeleteSeries(id, e.currentTarget.name);
    cbHandleClickUpdate();
  };
  return (
    <Card className="CardUserSeries">
      <Card.Img variant="top" src={url} title={name} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <p>{dateOfNewSeasonsMessage}</p>
        <div className="directionAction">
          <input
            type="number"
            aria-label="changeSeason"
            value={numberSeason}
            name={id}
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
