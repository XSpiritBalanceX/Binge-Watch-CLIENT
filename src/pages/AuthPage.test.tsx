import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import AuthPage from "./AuthPage";

jest.mock("../components/RegistrationForm", () => () => "RegistrationForm");
jest.mock("../components/LoginForm", () => () => "LoginForm");

describe("Auth page test:", () => {
  it("should render the component", () => {
    render(<AuthPage />, { wrapper: BrowserRouter });
    expect(screen.getByRole("authRole")).toBeInTheDocument();
  });

  it("should render the login header if the path = /login", () => {
    const loginRoute = "/login";
    render(
      <MemoryRouter initialEntries={[loginRoute]}>
        <AuthPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Авторизация")).toBeInTheDocument();
  });

  it("should render the registration header if the path = /registration", () => {
    const registrationRoute = "/registration";
    render(
      <MemoryRouter initialEntries={[registrationRoute]}>
        <AuthPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Регистрация")).toBeInTheDocument();
  });
});
