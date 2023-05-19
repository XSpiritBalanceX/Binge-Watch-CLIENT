export interface UserState {
  isLogin: boolean;
  userName: string | null;
  userEmail: string | null;
}
export enum UserActionTypes {
  ISLOGIN_USER = "ISLOGIN_USER",
  GET_USER_INFO = "GET_USER_INFO",
}
export interface IsloginAction {
  type: UserActionTypes.ISLOGIN_USER;
  login: boolean;
  tokenUser: string;
}
export interface GetUserInfo {
  type: UserActionTypes.GET_USER_INFO;
  name: string;
  email: string;
}

export type UserAction = IsloginAction | GetUserInfo;
