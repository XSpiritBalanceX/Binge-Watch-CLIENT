import { toast } from "react-toastify";

enum APIRouters {
  registration = "http://localhost:5000/api/users/registration",
  login = "http://localhost:5000/api/users/login",
}

export const urlToCatalog: string = "http://localhost:5000/api/series";

type UserData = {
  username?: string;
  email: string;
  password: string;
};

export const fetchWrapper = {
  registrationUser,
  loginUser,
};

async function registrationUser(body: UserData) {
  try {
    const response = await fetch(APIRouters.registration, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      toast.error(response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err: any) {
    if (err.name === "HTTPError") {
      const errorJson = await err.response.json();
      toast.error(errorJson.message);
    }
  }
}

async function loginUser(body: UserData) {
  try {
    const response = await fetch(APIRouters.login, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.status !== 200) {
      toast.error(response.statusText);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (err: any) {
    if (err.name === "HTTPError") {
      const errorJson = await err.response.json();
      toast.error(errorJson.message);
    }
  }
}
