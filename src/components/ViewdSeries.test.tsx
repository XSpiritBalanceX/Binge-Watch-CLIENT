import { render, screen, fireEvent } from "@testing-library/react";
import ViewdSeries from "./ViewdSeries";

const mockData = {
  info: {
    id: "id",
    name: "name series",
    url: "url series",
    seasons: 1,
    dateofnewseason: "data of new season",
    bwlistsusers: {
      viewdseries: true,
      desiredseries: false,
      numberofseason: 1,
    },
  },
  cbUpdateSeason: jest.fn(),
  cbHandleClickUpdate: jest.fn(),
  cbDeleteSeries: jest.fn(),
};

describe("ViewdSeries test:", () => {
  it("should render the component", () => {
    render(
      <ViewdSeries
        info={mockData.info}
        cbUpdateSeason={mockData.cbUpdateSeason}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    expect(screen.getByText("name series")).toBeInTheDocument();
  });

  it("should check the url of picture of series", () => {
    const { getByAltText } = render(
      <ViewdSeries
        info={mockData.info}
        cbUpdateSeason={mockData.cbUpdateSeason}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    const picture = getByAltText("name series");
    expect(picture.getAttribute("src")).toEqual("url series");
  });

  it("should get the id of series and name of button if user clicks on button Delete Series", () => {
    const { container } = render(
      <ViewdSeries
        info={mockData.info}
        cbUpdateSeason={mockData.cbUpdateSeason}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    const button = container.getElementsByClassName("deleteButton")[0];
    fireEvent.click(button);
    expect(mockData.cbDeleteSeries).toHaveBeenCalledTimes(1);
    expect(mockData.cbDeleteSeries).toHaveBeenCalledWith("id", "delete");
  });

  it("should get the id and season of series if user changes the season of series", () => {
    render(
      <ViewdSeries
        info={mockData.info}
        cbUpdateSeason={mockData.cbUpdateSeason}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    const input = screen.getByLabelText("changeSeason") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2" } });
    expect(mockData.cbUpdateSeason).toHaveBeenCalledTimes(1);
    expect(mockData.cbUpdateSeason).toHaveBeenCalledWith("id", 2);
  });
});
