import { render, fireEvent, screen } from "@testing-library/react";
import { AllSeries } from "@/hooks/useCatalogFetch";
import MainItem from "./MainItem";

const mockProps = {
  info: {
    id: "some id",
    name: "Name series",
    url: "some url",
    urlscreen: "some url",
  } as AllSeries,
  handleClick: jest.fn(),
};

describe("MainItem component test:", () => {
  it("should render the component with an image", async () => {
    const { getByAltText } = render(
      <MainItem
        infoSeries={mockProps.info}
        cbGoToSeriesPage={mockProps.handleClick}
      />
    );
    const img = getByAltText("Name series");
    expect(img).toBeInTheDocument();
  });

  it("should check if the image have attributes", async () => {
    const { getByAltText } = render(
      <MainItem
        infoSeries={mockProps.info}
        cbGoToSeriesPage={mockProps.handleClick}
      />
    );
    const img = getByAltText("Name series");
    expect(img).toHaveAttribute("src", "some url");
    expect(img).toHaveAttribute("title", "Name series");
  });

  it("should display the tooltip if user mouve the mouse over the image", async () => {
    const { getByAltText } = render(
      <MainItem
        infoSeries={mockProps.info}
        cbGoToSeriesPage={mockProps.handleClick}
      />
    );
    const img = getByAltText("Name series");
    fireEvent.focus(img);
    expect(await screen.findByText("Перейти к описанию")).toBeInTheDocument();
  });

  it("should get the id of series if user click on image", () => {
    const { getByAltText } = render(
      <MainItem
        infoSeries={mockProps.info}
        cbGoToSeriesPage={mockProps.handleClick}
      />
    );
    const img = getByAltText("Name series");
    fireEvent.click(img);
    expect(mockProps.handleClick).toHaveBeenCalledTimes(1);
    expect(mockProps.handleClick.mock.calls[0].toString()).toBe("some id");
  });
});
