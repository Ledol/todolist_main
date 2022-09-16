import {FilterTaskType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export const todolistsReducer = (state:Array<TodolistType>, action: ActionType):Array<TodolistType> =>{
    switch (action.type){
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistID)
        case 'ADD-TODOLIST':
            let newTodolist:TodolistType = {id: v1(), title: action.payload.newTitle, filter: 'all'}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, title: action.payload.changedTitle} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.filterValue} : tl)
        default:
            return state
    }
}

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistID}
    }as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTitle}
    }as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, changedTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistID, changedTitle }
    }as const
}

type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistID: string, filterValue: FilterTaskType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistID, filterValue }
    }as const
}