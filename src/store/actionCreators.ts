import { UserActionTypes } from "./typesForReducer";

export const loginUser = function (bool: boolean, token: string) {
  return {
    type: UserActionTypes.ISLOGIN_USER,
    login: bool,
    tokenUser: token,
  };
};

export const getUserInfo = function (nameUser: string) {
  return {
    type: UserActionTypes.GET_USER_INFO,
    name: nameUser,
  };
};
