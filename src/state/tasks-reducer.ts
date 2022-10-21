import {TasksStateType} from "../App";
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from "./todolists-reducer";
import { TaskStatuses, TaskType, todolistsApi, updateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

type ActionType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType
    | addTodolistACType | removeTodolistACType | setTodolistsACType|setTasksACType

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
            return {...state, [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]}
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(
                    t => t.id === action.payload.taskID ? {...t, status: action.payload.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(
                    t => t.id === action.payload.taskID ? {...t, title: action.payload.changedTitle} : t
                )
            }
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolistID]: []}
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

type setTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: TaskType[], todoId: string) => {
    return {
        type: 'SET-TASKS',
        payload: {tasks, todoId}

    } as const
}

export const getTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    todolistsApi.getTasks(todolistID)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistID))
        })

}
export const removeTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    todolistsApi.deleteTask(todolistID,taskID)
        .then((res) => {
            dispatch(removeTaskAC(todolistID, taskID))
        })
}
export const addTaskTC = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    todolistsApi.createTask(todolistID, title)
        .then((res) => {
            dispatch(addTaskAC(todolistID, res.data.data.item))
        })
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const model: updateTaskModelType= {...task, status}
            todolistsApi.updateTask(todolistId,taskId, model
            )
                .then((res) => {
                    dispatch(changeTaskStatusAC( todolistId, taskId, status))
                })
        }
    }
}