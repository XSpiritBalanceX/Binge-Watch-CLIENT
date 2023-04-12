import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyPage from "./MyPage";

jest.mock("../hooks/useTypedSelector", () => ({
  useTypedSelector: () => {
    return "Alice";
  },
}));

jest.mock("../hooks/useAuthFetch", () => ({
  useAuthFetch: () => {
    return false;
  },
}));

describe("Page user test:", () => {
  it("should find the image on the user page when page loaded", () => {
    const { getByAltText } = render(<MyPage />, { wrapper: BrowserRouter });
    const image = getByAltText("avatarUser");
    expect(image).toHaveClass("avatarUser");
  });

  it("should find the name of user when user is authorized", () => {
    render(<MyPage />, { wrapper: BrowserRouter });
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});
