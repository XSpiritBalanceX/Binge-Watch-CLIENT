import { BWListUser } from "@/hooks/useUserSeriesFetch";
import { Card, Button } from "react-bootstrap";

interface DesiredSeriesProps {
  info: {
    id: string;
    name: string;
    url: string;
    bwlistsusers: BWListUser;
  };
}

const DesiredSeries = ({ info }: DesiredSeriesProps) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={info.url}
        title={info.name}
        alt={info.name}
      />
      <Card.Body>
        <Card.Title>{info.name}</Card.Title>
        <Button variant="outline-success" onClick={(e) => console.log(info.id)}>
          <i className="bi bi-check2-square"></i>
        </Button>
        <Button variant="outline-danger" onClick={(e) => console.log(info.id)}>
          <i className="bi bi-trash3-fill"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DesiredSeries;
