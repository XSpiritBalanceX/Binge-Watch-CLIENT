import { useEffect, useState } from "react";
import queryString from "query-string";

export interface AllSeries {
  id: string;
  name: string;
  url: string;
  urlscreen: string;
  year: number;
  seasons: number;
  genre: string;
  description: string;
  dateofnewseason: string;
}

export interface MainSeries {
  latestSeries: AllSeries[];
  topTenSeries: AllSeries[];
}

export function useCatalogFetch(queryUrl: string, genrePage: string) {
  const [data, setData] = useState<AllSeries[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const urlCatalog: string = queryString.stringifyUrl({
    url: queryUrl,
    query: { genre: genrePage },
  });
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(decodeURI(urlCatalog));
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [urlCatalog]);
  return { data, error, loading };
}

export function useSeriesFetch(queryUrl: string, seriesID: string) {
  const [data, setData] = useState<AllSeries>({} as AllSeries);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const urlSeries: string = queryString.stringifyUrl({
    url: queryUrl + "/" + seriesID,
  });
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(urlSeries);
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [urlSeries]);
  return { data, error, loading };
}

export function useMainPageFetch() {
  const [data, setData] = useState<MainSeries | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          "http://localhost:5000/api/series/mainseries"
        );
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, []);
  return { data, error, loading };
}
