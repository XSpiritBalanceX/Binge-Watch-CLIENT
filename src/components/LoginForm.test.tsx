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

describe("Login form test:", () => {
  it("should render the component", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    expect(screen.getByText("Нет аккаунта?")).toBeInTheDocument();
  });

  it("should get the url with the path= /registration if user click on link", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByText("Зарегистрироваться"));
    expect(global.window.location.href).toContain(
      "http://localhost/registration"
    );
  });

  it("should check fields of form when user tries to fill them in", () => {
    render(<LoginForm />, { wrapper: BrowserRouter });
    const emailField: HTMLInputElement = screen.getByLabelText("email");
    const passwordField: HTMLInputElement = screen.getByLabelText("password");

    fireEvent.change(emailField, { target: { value: testValues.email } });
    expect(emailField.value).toBe(testValues.email);

    fireEvent.change(passwordField, { target: { value: testValues.password } });
    expect(passwordField.value).toBe(testValues.password);
  });
});
