import { createStore } from "redux";
import userReducer from "./userRuducer";

export const store = createStore(userReducer);

export type StateRedux = ReturnType<typeof userReducer>;
