import {todolistsAPI, TodolistType} from "../api/todolists-api";
import { AppThunkType} from "./store";

export type TodolistsActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType | SetTodolistsACType

const initialState: Array<TodolistDomainType> = []


export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterTaskType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistID)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistDomainType = {
                ...action.payload.todolist, filter: 'all'
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

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistID}
    } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todolist}
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, changedTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistID, changedTitle}
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistID: string, filterValue: FilterTaskType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistID, filterValue}
    } as const
}

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        todolists
    } as const
}

//thunk
export const getTodoTC = ():AppThunkType => async dispatch => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    }
    catch (e) {
        console.log(e)
    }
}

export const removeTodolistTC = (todolistID: string):AppThunkType => async dispatch => {
    try {
        const res = await todolistsAPI.deleteTodolist(todolistID)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistID))
        }
    }
    catch (e) {
        console.log(e)
    }
}
export const addTodolistTC = (title: string):AppThunkType => (dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
}
export const changeTodolistTitleTC = (todolistID: string, title: string):AppThunkType => (dispatch) => {
    todolistsAPI.updateTodolist(todolistID, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistID, title))
        })
}

