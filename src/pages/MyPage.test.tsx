import { render, screen, fireEvent } from "@testing-library/react";
import MyPage from "./MyPage";
import { UserSeries } from "@/hooks/useUserSeriesFetch";

jest.mock("../components/ViewdSeries", () => () => "ViewdSeries");
jest.mock("../components/DesiredSeries", () => () => "DesiredSeries");

jest.mock("../hooks/useTypedSelector", () => ({
  useTypedSelector: () => {
    return "Alice";
  },
}));

jest.mock("../hooks/useAuthFetch", () => ({
  useAuthFetch: () => {
    return true;
  },
}));

const mockUserSeriesData = {
  data: null as null | UserSeries,
  loading: true,
  error: null as string | null,
  seriesFetch: () => {
    return "function";
  },
};

jest.mock("../hooks/useUserSeriesFetch", () => ({
  useUserSeriesFetch: () => {
    return mockUserSeriesData;
  },
}));

describe("Page user test:", () => {
  it("should display spinner if data is in process", () => {
    const { container } = render(<MyPage />);
    expect(
      container.getElementsByClassName("spiner spinner-border text-light")
        .length
    ).toBe(1);
  });

  it("should display error div if hook returned error", () => {
    mockUserSeriesData.error = "some error";
    render(<MyPage />);
    expect(screen.getByText("Упс... Что-то пошло не так")).toBeInTheDocument();
  });

  it("should render the components with user series which he wants to watch if hook returned data", () => {
    mockUserSeriesData.loading = false;
    mockUserSeriesData.error = null;
    mockUserSeriesData.data = {
      id: "id",
      bwseries: [
        {
          id: "id",
          name: "name",
          url: "url",
          seasons: 1,
          dateofnewseason: "data",
          bwlistsusers: {
            viewdseries: true,
            desiredseries: false,
            numberofseason: 1,
          },
        },
      ],
    };
    render(<MyPage />);
    expect(screen.getByText("ViewdSeries")).toBeInTheDocument();
  });

  it("should display DesiredSeries component if user clicked on button", async () => {
    mockUserSeriesData.data = {
      id: "id",
      bwseries: [
        {
          id: "id2",
          name: "name2",
          url: "url2",
          seasons: 1,
          dateofnewseason: "data",
          bwlistsusers: {
            viewdseries: false,
            desiredseries: true,
            numberofseason: 1,
          },
        },
      ],
    };
    render(<MyPage />);
    fireEvent.click(screen.getByText("Хочу посмотреть"));
    expect(await screen.findByText("DesiredSeries")).toBeInTheDocument();
  });
});
