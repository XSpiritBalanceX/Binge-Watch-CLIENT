import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CatalogPage from "./CatalogPage";
import { AllSeries } from "@/hooks/useCatalogFetch";

jest.mock("../components/CatalogItem", () => () => "CatalogItem");
jest.mock("../components/MenuInCatalog", () => () => "MenuInCatalog");
jest.mock("../components/fetchWrapper");

const mockCatalogData = {
  data: [] as AllSeries[],
  loading: true,
  error: null as string | null,
};
jest.mock("../hooks/useCatalogFetch", () => ({
  useCatalogFetch: () => {
    return mockCatalogData;
  },
}));

describe("Catalog page test:", () => {
  it("should render the component with spiner", () => {
    const { container } = render(<CatalogPage />, { wrapper: BrowserRouter });
    expect(
      container.getElementsByClassName("spiner spinner-border text-light")
        .length
    ).toBe(1);
  });

  it("should display error div if hook returned error", () => {
    mockCatalogData.error = "some error";
    render(<CatalogPage />, { wrapper: BrowserRouter });
    expect(screen.getByText("Упс... Что-то пошло не так")).toBeInTheDocument();
  });

  it("should display div with information about series if hook returned some data", () => {
    mockCatalogData.data = [
      {
        id: "123456",
        name: "some name",
        url: "some url",
        urlscreen: "some url screen",
        year: 123,
        seasons: 1,
        genre: "some genre",
        description: "description about series",
        dateofnewseason: "some data",
      },
    ];
    mockCatalogData.error = null;
    mockCatalogData.loading = false;
    const { container } = render(<CatalogPage />, { wrapper: BrowserRouter });
    expect(screen.queryByTestId("spiner")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Упс... Что-то пошло не так")
    ).not.toBeInTheDocument();
    expect(container.getElementsByClassName("containerCatalog").length).toBe(1);
  });
});
