import { userReducer, initialState } from "./userReducer";
import { UserActionTypes, IsloginAction, GetUserInfo } from "./typesForReducer";

describe("Test user reducer", () => {
  it("should login user when get information from server", () => {
    const actionLogin: IsloginAction = {
      type: UserActionTypes.ISLOGIN_USER,
      login: true,
      tokenUser: "sometoken",
    };
    expect(userReducer(initialState, actionLogin)).toEqual({
      ...initialState,
      isLogin: true,
    });
  });
  it("should set name of user in state", () => {
    const actionName: GetUserInfo = {
      type: UserActionTypes.GET_USER_INFO,
      name: "Name User",
      email: "email user",
    };
    expect(userReducer(initialState, actionName)).toEqual({
      ...initialState,
      userName: "Name User",
      userEmail: "email user",
    });
  });
});
