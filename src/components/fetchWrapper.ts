import { toast } from "react-toastify";

enum APIRouters {
  registration = "http://localhost:5000/api/users/registration",
  login = "http://localhost:5000/api/users/login",
}

export const urlToCatalog: string = "http://localhost:5000/api/series";

export const urlToUserSeries: string = "http://localhost:5000/api/actions";

type UserData = {
  username?: string;
  email: string;
  password: string;
};

interface ResponseUser {
  token?: string;
  message: string;
}

const fetchWrapper = {
  get,
  post,
};

function get(url: string) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: UserData) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch((err) => {
      toast.error(err);
    });
}

function handleResponse(response: any) {
  return response.json().then((data: ResponseUser) => {
    if (!response.ok) {
      const error = response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

export const APIUser = {
  registrationUser,
  loginUser,
};

function loginUser(body: UserData) {
  return fetchWrapper.post(APIRouters.login, body);
}

function registrationUser(body: UserData) {
  return fetchWrapper.post(APIRouters.registration, body);
}
