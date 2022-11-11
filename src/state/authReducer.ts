import { Dispatch } from "redux";
import {
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType,
  setIsInitializedAC,
  SetIsInitializedACType,
} from "./app-reducer";
import { authAPI, Result_Code } from "../api/todolists-api";
import { LoginDataType } from "../features/Login/Login";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/error-utils";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "login/SET-IS-LOGGED-IN", value } as const);

// thunks
export const loginTC =
  (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const response = await authAPI.login(data);

      if (response.data.resultCode === Result_Code.OK) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch);
    }
  };

export const initializeAppTC =
  () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const response = await authAPI.me();
      if (response.data.resultCode === Result_Code.OK) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setIsInitializedAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    } catch (e) {
      handleServerNetworkError(e as { message: string }, dispatch);
    } finally {
      dispatch(setIsInitializedAC(true));
    }
  };

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC("loading"));
  try {
    const response = await authAPI.isLogout();
    if (response.data.resultCode === Result_Code.OK) {
      dispatch(setIsLoggedInAC(false));
      dispatch(setAppStatusAC("succeeded"));
    } else {
      handleServerAppError(response.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError(e as { message: string }, dispatch);
  }
};

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusACType
  | SetAppErrorACType
  | SetIsInitializedACType;
