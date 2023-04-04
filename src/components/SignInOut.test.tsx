import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignInOut from "./SignInOut";
import userEvent from "@testing-library/user-event";

jest.mock("../hooks/useTypedSelector", () => ({
  useTypedSelector: () => {
    return true;
  },
}));

describe("Sign In/Out test:", () => {
  it("should render the component", () => {
    render(<SignInOut />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("linkSign")).toBeInTheDocument();
  });

  it("should log out user if user clicks on link", async () => {
    window.open = jest.fn();
    render(<SignInOut />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    await user.click(screen.getByTestId("linkSign"));
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      "http://localhost:5000/api/users/logout",
      "_self"
    );
  });
});
