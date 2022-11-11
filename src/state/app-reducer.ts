export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.isInitialized };
    default:
      return state;
  }
};

// ACTIONS

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: "APP/SET-STATUS",
    status,
  } as const;
};

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export const setAppErrorAC = (error: null | string) => {
  return {
    type: "APP/SET-ERROR",
    error,
  } as const;
};

export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>;
export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: "SET-IS-INITIALIZED",
    isInitialized,
  } as const;
};

// THUNKS

// TYPES
export type InitialStateType = typeof initialState;
type ActionsType =
  | SetAppStatusACType
  | SetAppErrorACType
  | SetIsInitializedACType;
