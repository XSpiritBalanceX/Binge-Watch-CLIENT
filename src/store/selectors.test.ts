import {
  isLoginSelect,
  userNameSelect,
  userEmailSelect,
} from "@/store/selectors";
import { UserState } from "@/store/typesForReducer";

const fakeState: UserState = {
  isLogin: true,
  userName: "Name",
  userEmail: "email",
};

describe("Selectors tests:", () => {
  it("should return login as true", () => {
    const result = isLoginSelect(fakeState);
    expect(result).toBe(true);
  });
  it("should return name of user as string", () => {
    const result = userNameSelect(fakeState);
    expect(result).toBe("Name");
  });
  it("should return email of user as string", () => {
    const result = userEmailSelect(fakeState);
    expect(result).toBe("email");
  });
});
