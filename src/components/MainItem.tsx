import "@/styles/MainPage.scss";
import { AllSeries } from "@/hooks/useCatalogFetch";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface LatestSeriesProps {
  infoSeries: AllSeries;
  cbGoToSeriesPage: (id: string) => void;
}

const MainItem = ({ infoSeries, cbGoToSeriesPage }: LatestSeriesProps) => {
  return (
    <OverlayTrigger
      key={infoSeries.id}
      placement="top"
      overlay={<Tooltip id={infoSeries.id}>Перейти к описанию</Tooltip>}
    >
      <img
        title={infoSeries.name}
        alt={infoSeries.name}
        src={infoSeries.url}
        onClick={(e) => cbGoToSeriesPage(infoSeries.id as string)}
      />
    </OverlayTrigger>
  );
};

export default MainItem;
