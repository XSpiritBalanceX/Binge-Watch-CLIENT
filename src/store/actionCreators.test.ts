import { loginUser, getUserInfo } from "./actionCreators";
import { UserActionTypes } from "./typesForReducer";

describe("Testing action for reducer", () => {
  it("should create an action to set token and login user", () => {
    const expectedActionLogin = {
      type: UserActionTypes.ISLOGIN_USER,
      login: true,
      tokenUser: "sometoken",
    };
    expect(loginUser(true, "sometoken")).toEqual(expectedActionLogin);
  });
  it("should create an action to set name of user", () => {
    const expectedActionName = {
      type: UserActionTypes.GET_USER_INFO,
      name: "Name User",
      email: "email user",
    };
    expect(getUserInfo("Name User", "email user")).toEqual(expectedActionName);
  });
});
