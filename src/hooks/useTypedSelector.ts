import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StateRedux } from "@/store";

export const useTypedSelector: TypedUseSelectorHook<StateRedux> = useSelector;
