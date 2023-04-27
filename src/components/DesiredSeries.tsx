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
}

const DesiredSeries = ({ info, cbAddSeries }: DesiredSeriesProps) => {
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
            variant="outline-success"
            onClick={(e) => cbAddSeries(info.id, 1, "watched")}
          >
            <i className="bi bi-check2-square"></i>
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

export default DesiredSeries;
