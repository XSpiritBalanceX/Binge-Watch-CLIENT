import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyPage from "./MyPage";

jest.mock("../hooks/useTypedSelector", () => ({
  useTypedSelector: () => {
    return true;
  },
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe("Page user test:", () => {
  it("should renred the page user", () => {
    const { container } = render(<MyPage />, { wrapper: BrowserRouter });
    expect(
      container.getElementsByClassName("spiner spinner-border text-light")
        .length
    ).toBe(1);
  });

  it("should check if fetch works", () => {
    render(<MyPage />, { wrapper: BrowserRouter });
    expect(fetch).toHaveBeenLastCalledWith(
      "http://localhost:5000/api/users/profile",
      {
        headers: {
          Authorization: "Bearer null",
          "Content-type": "application/json",
        },
        method: "POST",
      }
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
