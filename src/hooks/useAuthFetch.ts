import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "@/store/actionCreators";
import { useNavigate } from "react-router-dom";

interface DataAboutUser {
  message: {
    id: string;
    username: string;
    email: string;
    password: string;
  };
}

export function useAuthFetch(token: string | null) {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        navigate("/");
      } else {
        const data: DataAboutUser = await response.json();
        dispatch(getUserInfo(data.message.username, data.message.email));
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return { loading };
}
