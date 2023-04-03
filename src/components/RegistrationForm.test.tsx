import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

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
    expect(screen.getByText("Есть аккаунт?")).toBeInTheDocument();
  });

  it("should get the url with the path= /login if user click on link", () => {
    render(<RegistrationForm />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Авторизоваться"));
    expect(global.window.location.href).toContain("http://localhost/login");
  });

  it("should check fields of form when user tries to fill them in", () => {
    const { nameField, emailField, passwordField } = setup();

    fireEvent.change(nameField, { target: { value: testValues.name } });
    expect(nameField.value).toBe(testValues.name);

    fireEvent.change(emailField, { target: { value: testValues.email } });
    expect(emailField.value).toBe(testValues.email);

    fireEvent.change(passwordField, { target: { value: testValues.password } });
    expect(passwordField.value).toBe(testValues.password);
  });

  it("should check fields of form for password match", () => {
    const { passwordField, repeatField } = setup();

    fireEvent.change(passwordField, { target: { value: testValues.password } });
    fireEvent.change(repeatField, { target: { value: testValues.password } });
    expect(repeatField.value).toEqual(passwordField.value);
  });
});