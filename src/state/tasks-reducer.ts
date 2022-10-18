import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

type ActionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType
    | addTodolistACType | removeTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(
                    t => t.id !== action.payload.taskID
                )
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.payload.newTitle, status: TaskStatuses.New, todoListId: action.payload.todolistID,
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""};
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(
                    t => t.id === action.payload.taskID ? {...t, status: action.payload.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(
                    t => t.id === action.payload.taskID ? {...t, taskTitle: action.payload.changedTitle} : t
                )
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistID]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState

        default:
            return state
    }
}

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskID, todolistID}
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {newTitle, todolistID}
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskID, todolistID, status}
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string, changedTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskID, todolistID, changedTitle}
    } as const
}