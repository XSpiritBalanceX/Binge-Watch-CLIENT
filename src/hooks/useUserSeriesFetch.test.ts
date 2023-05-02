import { useUserSeriesFetch, UserSeries } from "./useUserSeriesFetch";
import { renderHook, act, RenderHookResult } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe("useUserSeriesFetch hooks testing ", () => {
  let renderResults: RenderHookResult<
    {
      data: UserSeries | null;
      error: unknown;
      loading: boolean;
      seriesFetch: Function;
    },
    { queryUrl: string; name: string }
  >;

  it("should compose the correct url when the hook gets url and name of user", async () => {
    const fetchSpyOn = jest.spyOn(global, "fetch");
    await act(async () => {
      renderResults = renderHook(() =>
        useUserSeriesFetch("http://localhost:5000/api/actions", "name")
      );
    });
    expect(fetchSpyOn).toHaveBeenCalledTimes(1);
    expect(fetchSpyOn).toHaveBeenCalledWith(
      "http://localhost:5000/api/actions?username=name"
    );
  });

  it("should chech return values of hook", async () => {
    await act(async () => {
      renderResults = renderHook(() => useUserSeriesFetch("url", "name"));
    });
    expect(renderResults.result.current.loading).toBe(false);
    expect(renderResults.result.current.error).toBe(null);
    expect(typeof renderResults.result.current.seriesFetch).toBe("function");
  });
});
