import { render, screen, fireEvent } from "@testing-library/react";
import DesiredSeries from "./DesiredSeries";

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
  cbAddSeries: jest.fn(),
  cbHandleClickUpdate: jest.fn(),
  cbDeleteSeries: jest.fn(),
};

describe("DesiredSeries test:", () => {
  it("should render the component", () => {
    render(
      <DesiredSeries
        info={mockData.info}
        cbAddSeries={mockData.cbAddSeries}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    expect(screen.getByText("name series")).toBeInTheDocument();
  });

  it("should check the url of picture of series", () => {
    const { getByAltText } = render(
      <DesiredSeries
        info={mockData.info}
        cbAddSeries={mockData.cbAddSeries}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    const picture = getByAltText("name series");
    expect(picture.getAttribute("src")).toEqual("url series");
  });

  it("should get the id and name of button if user clicks on button delete", () => {
    const { container } = render(
      <DesiredSeries
        info={mockData.info}
        cbAddSeries={mockData.cbAddSeries}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    const button = container.getElementsByClassName("deleteButton")[0];
    fireEvent.click(button);
    expect(mockData.cbDeleteSeries).toHaveBeenCalledTimes(1);
    expect(mockData.cbDeleteSeries).toHaveBeenCalledWith("id", "delete");
  });

  it("should get the id, number of season and name of button if user clicks on button viewed series", () => {
    const { container } = render(
      <DesiredSeries
        info={mockData.info}
        cbAddSeries={mockData.cbAddSeries}
        cbHandleClickUpdate={mockData.cbHandleClickUpdate}
        cbDeleteSeries={mockData.cbDeleteSeries}
      />
    );
    const button = container.getElementsByClassName("btn-outline-success")[0];
    fireEvent.click(button);
    expect(mockData.cbAddSeries).toHaveBeenCalledTimes(1);
    expect(mockData.cbAddSeries).toHaveBeenCalledWith("id", 1, "watched");
  });
});
