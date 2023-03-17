import { useEffect, useState } from "react";

interface AllSeries {
  id: number;
  name: string;
  url: string;
  year: number;
  seasons: number;
  genre: string;
  description: string;
  dateofnewseason: string;
}

export default function useCatalogFetch(url: string) {
  const [data, setData] = useState<[] | AllSeries[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(url);
        const getData = await response.json();
        setData(getData);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [url]);
  return { data, error, loading };
}
