import ky from "ky";
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
    const response = await ky.post(APIRouters.registration, {
      json: body,
    });
    if (response.status !== 200) {
      toast.error(response.statusText);
    } else {
      return response.json();
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
    const response = await ky.post(APIRouters.login, {
      json: body,
    });
    if (response.status !== 200) {
      toast.error(response.statusText);
    } else {
      return response.json();
    }
  } catch (err: any) {
    if (err.name === "HTTPError") {
      const errorJson = await err.response.json();
      toast.error(errorJson.message);
    }
  }
}
