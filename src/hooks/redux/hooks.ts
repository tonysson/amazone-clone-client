
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";


// OverWrite the builting react-redux useDispatch method
export const useAppDispatch = () => useDispatch<AppDispatch>()

// OverWrite the builting react-redux useSelector method
export const useAppSelector : TypedUseSelectorHook<RootState> =  useSelector