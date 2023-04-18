import {
  AllSeries,
  useCatalogFetch,
  useSeriesFetch,
  MainSeries,
  useMainPageFetch,
} from "./useCatalogFetch";
import { renderHook, act, RenderHookResult } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe("Custom hooks testing ", () => {
  let renderResults: RenderHookResult<
    { data: AllSeries[]; error: unknown; loading: boolean },
    { queryUrl: string; genrePage: string }
  >;
  let renderResultsSeries: RenderHookResult<
    { data: AllSeries; error: unknown; loading: boolean },
    { queryUrl: string; idSeries: string }
  >;
  let renderResultsMainPage: RenderHookResult<
    { data: MainSeries | null; error: unknown; loading: boolean },
    unknown
  >;

  it("should get the data with lenght = 0 if the hook gets the wrong url", async () => {
    await act(async () => {
      renderResults = renderHook(() => useCatalogFetch("someurl", "драма"));
    });
    expect(renderResults.result.current.data.length).toBe(0);
  });

  it("should compose the correct url when the hook gets url and genre", async () => {
    const fetchSpyOn = jest.spyOn(global, "fetch");
    await act(async () => {
      renderResults = renderHook(() =>
        useCatalogFetch("http://localhost:5000/api/series", "драма")
      );
    });
    expect(fetchSpyOn).toBeCalledWith(
      "http://localhost:5000/api/series?genre=драма"
    );
  });

  it("should get the data which have to be in the form of an array", async () => {
    await act(async () => {
      renderResultsSeries = renderHook(() =>
        useSeriesFetch("someurl", "драма")
      );
    });
    expect(renderResultsSeries.result.current.data).toEqual([]);
  });

  it("should compose the correct url when the hook gets url and the id of series", async () => {
    const fetchSpyOnSeries = jest.spyOn(global, "fetch");
    await act(async () => {
      renderResultsSeries = renderHook(() =>
        useSeriesFetch("http://localhost:5000/api/series", "2")
      );
    });
    expect(fetchSpyOnSeries).toBeCalledWith(
      "http://localhost:5000/api/series/2"
    );
  });

  it("should get the data from useMainPageFetch as array", async () => {
    await act(async () => {
      renderResultsMainPage = renderHook(() => useMainPageFetch());
    });
    expect(renderResultsMainPage.result.current.data).toEqual([]);
    expect(renderResultsMainPage.result.current.loading).toBe(false);
    expect(renderResultsMainPage.result.current.error).toBe(null);
  });

  it("should check the url when the hook was called", async () => {
    const fetchSpyOnSeries = jest.spyOn(global, "fetch");
    await act(async () => {
      renderResultsMainPage = renderHook(() => useMainPageFetch());
    });
    expect(fetchSpyOnSeries).toBeCalledWith(
      "http://localhost:5000/api/series/mainseries"
    );
  });
});
