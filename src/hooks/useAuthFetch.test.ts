import { useAuthFetch } from "./useAuthFetch";
import { renderHook, act } from "@testing-library/react";
import * as reactRedux from "react-redux";
import * as router from "react-router";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

const token = "token.string";

describe("Custom hook useAuthFetch test:", () => {
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  const useNavigateMock = jest.spyOn(router, "useNavigate");
  it("should check if fetch works", async () => {
    const fetchSpyOn = jest.spyOn(global, "fetch");
    await act(async () => {
      renderHook(() => useAuthFetch(token));
    });
    expect(fetchSpyOn).toHaveBeenCalledWith(
      "http://localhost:5000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        method: "POST",
      }
    );
    expect(fetchSpyOn).toHaveBeenCalledTimes(1);
  });

  it("should return loading true while the component is loading", async () => {
    const { result } = renderHook(() => useAuthFetch(token));
    expect(result.current.loading).toEqual(true);
  });

  it("should test is dispatch was called", () => {
    const dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("should test is dispatch was called", () => {
    const navigate = jest.fn();
    useNavigateMock.mockReturnValue(navigate);
    expect(navigate).not.toHaveBeenCalled();
  });
});
