import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

jest.mock("../store/actionCreators");
jest.mock("../components/fetchWrapper");
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const testValues = {
  email: "user@user.com",
  password: "123456",
};

const setup = () => {
  const utils = render(<LoginForm />, { wrapper: BrowserRouter });
  const emailField: HTMLInputElement = screen.getByLabelText("email");
  const passwordField: HTMLInputElement = screen.getByLabelText("password");
  return {
    emailField,
    passwordField,
    ...utils,
  };
};

describe("Login form test:", () => {
  it("should render the component", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("should get the url with the path= /registration if user click on link", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(global.window.location.href).toContain(
      "http://localhost/registration"
    );
  });

  it("should check fields of form when user tries to fill them in", () => {
    const { emailField, passwordField } = setup();

    fireEvent.change(emailField, { target: { value: testValues.email } });
    expect(emailField.value).toBe(testValues.email);

    fireEvent.change(passwordField, { target: { value: testValues.password } });
    expect(passwordField.value).toBe(testValues.password);
  });

  it("should display error div if user didn't fill the fields in", async () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    fireEvent.submit(screen.getByTestId("form"));
    expect(await screen.findByText("Email обязателен")).toBeInTheDocument();
    expect(await screen.findByText("Пароль обязателен")).toBeInTheDocument();
  });

  it("should display error div if user fills the filled in with the wrong data", async () => {
    const { emailField, passwordField } = setup();

    fireEvent.change(emailField, { target: { value: "user" } });
    fireEvent.change(passwordField, { target: { value: "123" } });
    fireEvent.submit(screen.getByTestId("form"));

    expect(await screen.findByText("Неверный email")).toBeInTheDocument();
    expect(
      await screen.findByText("Пароль должен состьять из 6 символов")
    ).toBeInTheDocument();
  });
});
