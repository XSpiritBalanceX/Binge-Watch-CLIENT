export interface UserState {
  isLogin: boolean;
  userName: string | null;
}
export enum UserActionTypes {
  ISLOGIN_USER = "ISLOGIN_USER",
  GET_USER_INFO = "GET_USER_INFO",
}
interface IsloginAction {
  type: UserActionTypes.ISLOGIN_USER;
  login: boolean;
  tokenUser: string;
}
interface GetUserInfo {
  type: UserActionTypes.GET_USER_INFO;
  name: string;
}

export type UserAction = IsloginAction | GetUserInfo;
