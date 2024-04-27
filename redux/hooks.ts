import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { constants } from "buffer";


export const useAppDispatch =()=>useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState>= useSelector;
