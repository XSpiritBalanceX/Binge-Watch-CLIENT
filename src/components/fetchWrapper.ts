import { toast } from "react-toastify";
import queryString from "query-string";

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

type UserSeriesData = {
  email: string;
  idseries: string;
  numberseason?: number;
};

interface ResponseUser {
  token?: string;
  message: string;
}

const fetchWrapper = {
  get,
  post,
  put,
};

function get(url: string) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: UserData | UserSeriesData) {
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

function put(url: string, body: UserSeriesData) {
  const requestOptions = {
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
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
  addedSeriesToList,
  deleteSeriesFromList,
};

function loginUser(body: UserData) {
  return fetchWrapper.post(APIRouters.login, body);
}

function registrationUser(body: UserData) {
  return fetchWrapper.post(APIRouters.registration, body);
}

function addedSeriesToList(params: string, body: UserSeriesData) {
  const urlUserSeries: string = queryString.stringifyUrl({
    url: urlToUserSeries + "/" + params,
  });
  return fetchWrapper.post(urlUserSeries, body);
}

function deleteSeriesFromList(params: string, body: UserSeriesData) {
  const urlDeleteSeries: string = queryString.stringifyUrl({
    url: urlToUserSeries + "/" + params,
  });
  return fetchWrapper.put(urlDeleteSeries, body);
}
