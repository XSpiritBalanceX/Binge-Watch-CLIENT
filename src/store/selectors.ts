import { StateRedux } from "@/store";

export const allState = (state: StateRedux) => state;
export const isLoginSelect = (state: StateRedux) => allState(state).isLogin;
export const userNameSelect = (state: StateRedux) => allState(state).userName;
