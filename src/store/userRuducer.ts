import { UserState, UserAction, UserActionTypes } from "./typesForReducer";

let tokenInStorage: string | null = sessionStorage.getItem("token");

const initialState: UserState = {
  isLogin: tokenInStorage !== null ? true : false,
  userName: null,
};

function userReducer(state = initialState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionTypes.ISLOGIN_USER: {
      let newState = { ...state };
      newState.isLogin = action.login;
      sessionStorage.setItem("token", action.tokenUser);
      return newState;
    }

    case UserActionTypes.GET_USER_INFO: {
      let newState = { ...state };
      newState.userName = action.name;
      return newState;
    }
    default:
      return state;
  }
}

export default userReducer;
