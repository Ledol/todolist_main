import {TasksStateType} from "../App";
import {AddTodolistACType, RemoveTodolistACType, SetTodolistsACType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, updateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import { AppRootStateType} from "./store";

export type TasksActionsType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType
    | AddTodolistACType | RemoveTodolistACType | SetTodolistsACType|setTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(
                    t => t.id !== action.payload.taskID
                )
            }
        case 'ADD-TASK':
            return {...state, [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]}
        case "UPDATE-TASK":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(
                    t => t.id === action.payload.taskID ? {...t,  ...action.payload.model} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(
                    t => t.id === action.payload.taskID ? {...t, title: action.payload.changedTitle} : t
                )
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState
        case "SET-TODOLISTS":
            const stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        case "SET-TASKS":
            return {...state, [action.payload.todoId]: action.payload.tasks}

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
export const addTaskAC = (todolistID: string, task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {todolistID,task}
    } as const
}

type changeTaskStatusACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, taskID: string, model: updateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        payload: {taskID, todolistID, model}
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string, changedTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskID, todolistID, changedTitle}
    } as const
}

type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: TaskType[], todoId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {tasks, todoId}

    } as const
}

export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistID))
        })

}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistID,taskID)
        .then((res) => {
            dispatch(removeTaskAC(todolistID, taskID))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistID, title)
        .then((res) => {
            dispatch(addTaskAC(todolistID, res.data.data.item))
        })
}

export type updateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: updateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const apiModel: updateTaskModelType= {...task, ...domainModel}
            todolistsAPI.updateTask(todolistId,taskId, apiModel
            )
                .then((res) => {
                    dispatch(updateTaskAC( todolistId, taskId, domainModel))
                })
        }
    }
}