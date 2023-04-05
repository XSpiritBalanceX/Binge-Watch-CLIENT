import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./RoutesComponent";
import userEvent from "@testing-library/user-event";

jest.mock("../pages/AuthPage", () => () => (
  <div>
    Auth Page
    <a href="http://localhost/login" data-testid="login">
      go to login form
    </a>
  </div>
));
jest.mock("../pages/MainPage", () => () => "MainPage");
jest.mock("../pages/MyPage", () => () => (
  <div data-testid="mypage">User Page</div>
));
jest.mock("../pages/CatalogPage", () => () => "CatalogPage");
jest.mock("../pages/SeriesPage", () => () => (
  <div data-testid="series">Series Page</div>
));

jest.mock("../hooks/useTypedSelector", () => ({
  useTypedSelector: () => {
    return true;
  },
}));

describe("Routes test:", () => {
  it("should render the main page if route = /", () => {
    render(<RoutesComponent />, { wrapper: BrowserRouter });
    expect(screen.getByText("MainPage")).toBeInTheDocument();
  });

  it("should render the auth page if route = /registration", () => {
    window.history.pushState({}, "", "/registration");
    render(<RoutesComponent />, { wrapper: BrowserRouter });
    expect(screen.getByText("Auth Page")).toBeInTheDocument();
    expect(global.window.location.href).toContain(
      "http://localhost/registration"
    );
  });

  it("should render the auth page if user clicks on link and route = /login", async () => {
    window.history.pushState({}, "", "/login");
    render(<RoutesComponent />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByTestId("login"));
    expect(global.window.location.href).toContain("http://localhost/login");
    expect(screen.getByText("Auth Page")).toBeInTheDocument();
  });

  it("should render the user page if route = /mypage and user is loged", () => {
    window.history.pushState({}, "", "/mypage");
    render(<RoutesComponent />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("mypage")).toBeInTheDocument();
    expect(global.window.location.href).toContain("http://localhost/mypage");
  });

  it("should render the catalog if route = /catalog/:name ", () => {
    window.history.pushState({}, "", "/catalog/somename");
    render(<RoutesComponent />, { wrapper: BrowserRouter });
    expect(screen.getByText("CatalogPage")).toBeInTheDocument();
    expect(global.window.location.href).toContain(
      "http://localhost/catalog/somename"
    );
  });

  it("should render the series page if route = /series/:id ", () => {
    window.history.pushState({}, "", "/series/3");
    render(<RoutesComponent />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("series")).toBeInTheDocument();
    expect(global.window.location.href).toContain("http://localhost/series/3");
  });

  it("should render the main page if route is wrong ", () => {
    window.history.pushState({}, "", "/bad/route");
    render(<RoutesComponent />, { wrapper: BrowserRouter });
    expect(screen.getByText("MainPage")).toBeInTheDocument();
    expect(global.window.location.href).toContain("http://localhost/");
  });
});
