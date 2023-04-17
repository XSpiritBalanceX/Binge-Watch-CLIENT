import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import { MainSeries } from "@/hooks/useCatalogFetch";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));
jest.mock("../components/MainItem", () => () => "MainItem");
const mockData = {
  data: {} as MainSeries,
  loading: true,
  error: null as string | null,
};
jest.mock("../hooks/useCatalogFetch", () => ({
  useMainPageFetch: () => {
    return mockData;
  },
}));

describe("Main page test:", () => {
  it("should render spiner if data acquisition is in progress", async () => {
    const { container } = render(<MainPage />, { wrapper: BrowserRouter });
    expect(
      container.getElementsByClassName("spiner spinner-border text-light")
        .length
    ).toBe(1);
  });

  it("should display error div if hook returned error", () => {
    mockData.error = "some error";
    render(<MainPage />, { wrapper: BrowserRouter });
    expect(screen.getByText("Упс... Что-то пошло не так")).toBeInTheDocument();
  });

  it("should render the components with series if hook returned data", () => {
    mockData.data = {
      latestSeries: [],
      topTenSeries: [],
    };
    mockData.error = null;
    mockData.loading = false;
    render(<MainPage />, { wrapper: BrowserRouter });
    expect(
      screen.getByText("Последние добавленные сериалы")
    ).toBeInTheDocument();
  });
});
