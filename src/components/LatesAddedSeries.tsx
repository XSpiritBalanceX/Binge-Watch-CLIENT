import "@/styles/MainPage.scss";
import { AllSeries } from "@/hooks/useCatalogFetch";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface MainSeriesProps {
  infoSeries: AllSeries;
  cbGoToSeriesPage: (id: string) => void;
}

const LatesAddedSeries = ({
  infoSeries,
  cbGoToSeriesPage,
}: MainSeriesProps) => {
  return (
    <OverlayTrigger
      key={infoSeries.id}
      placement="top"
      overlay={<Tooltip id={infoSeries.id}>Перейти к описанию</Tooltip>}
    >
      <img
        title={infoSeries.name}
        src={infoSeries.url}
        onClick={(e) => cbGoToSeriesPage(infoSeries.id as string)}
      />
    </OverlayTrigger>
  );
};

export default LatesAddedSeries;
