import { todolistsAPI, TodolistType } from "../api/todolists-api";
import { AppThunkType } from "./store";
import {
  RequestStatusType,
  setAppErrorAC,
  SetAppErrorACType,
  setAppStatusAC,
  SetAppStatusACType,
} from "./app-reducer";
import { Dispatch } from "redux";
import { handleServerAppError } from "../utils/error-utils";
import axios, { AxiosError } from "axios";

export type TodolistsActionsType =
  | RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | ChangeTodolistFilterACType
  | SetTodolistsACType
  | SetAppStatusACType
  | ChangeTodolistEntityStatusACType;

const initialState: Array<TodolistDomainType> = [];

export type FilterTaskType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterTaskType;
  entityStatus: RequestStatusType;
};

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistsActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.payload.todolistID);
    case "ADD-TODOLIST":
      let newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      };
      return [newTodolist, ...state];
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) =>
        tl.id === action.payload.todolistID
          ? { ...tl, title: action.payload.changedTitle }
          : tl
      );
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) =>
        tl.id === action.payload.todolistID
          ? { ...tl, filter: action.payload.filterValue }
          : tl
      );
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    case "CHANGE-STATUS-ENTITY-STATUS":
      return state.map((tl) =>
        tl.id === action.payload.todolistID
          ? { ...tl, entityStatus: action.payload.status }
          : tl
      );
    default:
      return state;
  }
};

// ACTIONS
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (todolistID: string) => {
  return {
    type: "REMOVE-TODOLIST",
    payload: { todolistID },
  } as const;
};

export type AddTodolistACType = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST",
    payload: { todolist },
  } as const;
};

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = (
  todolistID: string,
  changedTitle: string
) => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    payload: { todolistID, changedTitle },
  } as const;
};

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>;
export const changeTodolistFilterAC = (
  todolistID: string,
  filterValue: FilterTaskType
) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: { todolistID, filterValue },
  } as const;
};

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>;
export const setTodolistsAC = (todolists: TodolistType[]) => {
  return {
    type: "SET-TODOLISTS",
    todolists,
  } as const;
};

export type ChangeTodolistEntityStatusACType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;
export const changeTodolistEntityStatusAC = (
  todolistID: string,
  status: RequestStatusType
) => {
  return {
    type: "CHANGE-STATUS-ENTITY-STATUS",
    payload: { todolistID, status },
  } as const;
};

// THUNKS
export const getTodoTC = (): AppThunkType => async (dispatch) => {
  try {
    const res = await todolistsAPI.getTodolists();
    dispatch(setTodolistsAC(res.data));
    dispatch(setAppStatusAC("succeeded"));
  } catch (e) {
    console.log(e);
  }
};

export const removeTodolistTC =
  (todolistID: string): AppThunkType =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      dispatch(changeTodolistEntityStatusAC(todolistID, "loading"));
      const res = await todolistsAPI.deleteTodolist(todolistID);
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistID));
        dispatch(setAppStatusAC("succeeded"));
      }
    } catch (e) {
      console.log(e);
    }
  };
export const addTodolistTC =
  (title: string) =>
  async (dispatch: Dispatch<TodolistsActionsType | SetAppErrorACType>) => {
    try {
      dispatch(setAppStatusAC("loading"));
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e) {
      // типизация если с бэка вернет в респонсе ответ
      const err = e as Error | AxiosError;
      if (axios.isAxiosError(err)) {
        const error = err.response?.data
          ? (err.response.data as { error: string }).error
          : err.message;
        dispatch(setAppErrorAC(error));
      }
      dispatch(setAppStatusAC("failed"));
    }
  };
export const changeTodolistTitleTC =
  (todolistID: string, title: string): AppThunkType =>
  async (dispatch) => {
    try {
      dispatch(setAppStatusAC("loading"));
      await todolistsAPI.updateTodolist(todolistID, title);
      dispatch(changeTodolistTitleAC(todolistID, title));
      dispatch(setAppStatusAC("succeeded"));
    } catch (e) {
      console.log(e);
    }
  };
