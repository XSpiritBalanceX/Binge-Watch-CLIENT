import { render, screen } from "@testing-library/react";
import SeriesPage from "./SeriesPage";
import { AllSeries } from "@/hooks/useCatalogFetch";

jest.mock("../components/CardItem", () => () => "CardItem");
jest.mock("../components/AddButton", () => () => "AddButton");
jest.mock("../hooks/useTypedSelector");
jest.mock("../store/selectors");

const mockSeriesData = {
  data: {} as AllSeries,
  loading: true,
  error: null as string | null,
};
jest.mock("../hooks/useCatalogFetch", () => ({
  useSeriesFetch: () => {
    return mockSeriesData;
  },
}));

describe("Series page test:", () => {
  it("should render the component with spiner", () => {
    const { container } = render(<SeriesPage />);
    expect(
      container.getElementsByClassName("spiner spinner-border text-light")
        .length
    ).toBe(1);
  });

  it("should display error div if hook returned error", () => {
    mockSeriesData.error = "some error";
    render(<SeriesPage />);
    expect(screen.getByText("Упс... Что-то пошло не так")).toBeInTheDocument();
  });

  it("should display div with information about series if hook returned some data", () => {
    mockSeriesData.data = {
      id: "123456",
      name: "some name",
      url: "some url",
      urlscreen: "some url screen",
      year: 123,
      seasons: 1,
      genre: "some genre",
      description: "description about series",
      dateofnewseason: "some data",
    };
    mockSeriesData.error = null;
    mockSeriesData.loading = false;
    const { container } = render(<SeriesPage />);
    expect(screen.queryByTestId("spiner")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Упс... Что-то пошло не так")
    ).not.toBeInTheDocument();
    expect(container.getElementsByClassName("containerSeriesPage").length).toBe(
      1
    );
  });
});
