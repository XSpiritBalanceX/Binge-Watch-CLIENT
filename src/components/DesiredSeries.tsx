import { BWListUser } from "@/hooks/useUserSeriesFetch";
import { Card, Button } from "react-bootstrap";
import "@/styles/MyPage.scss";

interface DesiredSeriesProps {
  info: {
    id: string;
    name: string;
    url: string;
    bwlistsusers: BWListUser;
  };
  cbAddSeries: (id: string, numberSeason: number, paramReq: string) => void;
  cbHandleClickUpdate: () => void;
  cbDeleteSeries: (id: string, paramReq: string) => void;
}

const DesiredSeries = ({
  info,
  cbAddSeries,
  cbHandleClickUpdate,
  cbDeleteSeries,
}: DesiredSeriesProps) => {
  const handleClickAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    cbAddSeries(info.id, 1, e.currentTarget.name);
    cbHandleClickUpdate();
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    cbDeleteSeries(info.id, e.currentTarget.name);
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
        <div className="directionAction">
          <Button
            name="watched"
            variant="outline-success"
            onClick={handleClickAdd}
          >
            <i className="bi bi-check2-square"></i>
          </Button>
          <Button
            name="delete"
            className="deleteButton"
            variant="outline-danger"
            onClick={handleClickDelete}
          >
            <i className="bi bi-trash3-fill"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DesiredSeries;
