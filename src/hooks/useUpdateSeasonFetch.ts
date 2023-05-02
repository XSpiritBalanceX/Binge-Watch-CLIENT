import { useEffect } from "react";
import { APIUser } from "@/components/fetchWrapper";
import { toast } from "react-toastify";

export function useUpdateSeasonFetch(
  id: string | null,
  season: number | null,
  userEmail: string | null
) {
  useEffect(() => {
    const getData = setTimeout(async () => {
      if (id !== null && season !== null) {
        const response = await APIUser.addedSeriesToList("watched", {
          email: userEmail as string,
          idseries: id,
          numberseason: season,
        });
        if (response) {
          toast.success(`${season} сезон добавлен`);
        }
      }
    }, 2000);
    return () => clearTimeout(getData);
  }, [id, season]);
}
