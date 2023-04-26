import { useEffect, useState } from "react";
import queryString from "query-string";
import { AllSeries } from "@/hooks/useCatalogFetch";

export interface BWListUser {
  viewdseries: boolean;
  desiredseries: boolean;
  numberofseason: number;
}

interface UserSeries {
  id: string;
  bwseries: [
    {
      id: string;
      name: string;
      url: string;
      seasons: number;
      dateofnewseason: string;
      bwlistsusers: BWListUser;
    }
  ];
}

export function useUserSeriesFetch(queryUrl: string, name: string | null) {
  const [data, setData] = useState<UserSeries | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const urlUserSeries: string = queryString.stringifyUrl({
    url: queryUrl,
    query: { username: name },
  });
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(urlUserSeries);
        const getData = await response.json();
        setData(getData.userSeries);
        setLoading(false);
      } catch (err: any) {
        setError(err);
      }
    })();
  }, [urlUserSeries]);
  return { data, error, loading };
}
