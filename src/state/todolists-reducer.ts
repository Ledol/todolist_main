import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType
    | changeTodolistFilterACType | setTodolistsACType

const initialState: Array<TodolistDomainType> = []


export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterTaskType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistID)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolistID, title: action.payload.newTitle,
                addedDate: "", order: 0, filter: "all"
            }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistID ? {
                ...tl,
                title: action.payload.changedTitle
            } : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistID ? {
                ...tl,
                filter: action.payload.filterValue
            } : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistID}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTitle, todolistID: v1()}
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, changedTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistID, changedTitle}
    } as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistID: string, filterValue: FilterTaskType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistID, filterValue}
    } as const
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

export const getTodoTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

