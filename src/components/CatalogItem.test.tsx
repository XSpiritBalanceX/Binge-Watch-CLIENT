import { render, screen, fireEvent, getByText } from "@testing-library/react";
import CatalogItem from "./CatalogItem";
import { AllSeries } from "@/hooks/useCatalogFetch";
import userEvent from "@testing-library/user-event";

const fakeProps = {
  info: {
    id: "3658b23e",
    name: "name of series",
  } as AllSeries,
};
const handleClick = jest.fn();

describe("Catalog item tests:", () => {
  it("should render name of series if the component gets props", async () => {
    render(
      <CatalogItem info={fakeProps.info} cbGoToSeriesPage={handleClick} />
    );
    const nameSeries = await screen.findByText(fakeProps.info.name);
    expect(nameSeries).toBeInTheDocument();
  });

  it("should get id of series if user click on button", async () => {
    render(
      <CatalogItem info={fakeProps.info} cbGoToSeriesPage={handleClick} />
    );
    const user = userEvent.setup();
    await user.click(screen.getByText("Посмотреть"));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick.mock.calls[0].toString()).toBe("3658b23e");
  });
});
