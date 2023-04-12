import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import { act } from "react-dom/test-utils";

jest.mock("../store/actionCreators");
jest.mock("../components/fetchWrapper");

const testValues = {
  name: "User",
  email: "user@user.com",
  password: "123456",
};

const setup = () => {
  const utils = render(<RegistrationForm />, { wrapper: BrowserRouter });
  const nameField: HTMLInputElement = screen.getByLabelText("name");
  const emailField: HTMLInputElement = screen.getByLabelText("email");
  const passwordField: HTMLInputElement = screen.getByLabelText("password");
  const repeatField: HTMLInputElement = screen.getByLabelText("repeatpassword");
  return {
    nameField,
    emailField,
    passwordField,
    repeatField,
    ...utils,
  };
};

describe("Login form test:", () => {
  it("should render the component", () => {
    render(<RegistrationForm />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("form")).toBeInTheDocument();
  });

  it("should get the url with the path= /login if user click on link", () => {
    render(<RegistrationForm />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Авторизоваться"));
    expect(global.window.location.href).toContain("http://localhost/login");
  });

  it("should not display error div if user entered the correct password again", async () => {
    const { passwordField, repeatField } = setup();

    fireEvent.change(passwordField, { target: { value: testValues.password } });
    fireEvent.change(repeatField, { target: { value: testValues.password } });
    await act(() => fireEvent.submit(screen.getByTestId("form")));
    expect(screen.queryByText("Пароли не совпадают")).not.toBeInTheDocument();
  });

  it("should display error div if user didn't fill the fields in", async () => {
    render(<RegistrationForm />, { wrapper: BrowserRouter });
    fireEvent.submit(screen.getByTestId("form"));
    expect(
      await screen.findByText("Имя пользователя обезательно")
    ).toBeInTheDocument();
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
