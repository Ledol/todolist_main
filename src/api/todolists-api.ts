import axios, {AxiosResponse} from "axios";
import {TaskDomainType} from "../state/tasks-reducer";
import {LoginDataType} from "../features/Login/Login";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '36c6d8e6-c7f6-48a8-984f-4e1b0d11ee5b',
    },
})

// API
export const todolistsAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
            `todo-lists/${todolistId}`,
            {title},
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}`,
        )
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>(
            `todo-lists`,
            {title},
        )
    },
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },

    getTasks(todolistId: string) {
        return instance.get<getTaskType>(
            `todo-lists/${todolistId}/tasks`,
        )
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskDomainType }>>>(
            `todo-lists/${todolistId}/tasks`,
            {title},
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
        )
    },
    updateTask(todolistId: string, taskId: string, model: updateTaskModelType) {
        return instance.put<updateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model
        )
    },
}

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ResponseType<{userId: string}>>>('/auth/login', data)
    },
    me(){
        return instance.get<ResponseType<AuthMeResponseType>>('/auth/me')
    },
    isLogout () {
        return instance.delete<ResponseType>('/auth/login')
    }
}


// TYPES

export type AuthMeResponseType = {
    id: number
    email: string
    login: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type getTaskType = {
    error: string[] | null
    items: TaskDomainType[]
    totalCount: number
}
export type TaskType = {
    addedDate: string
    deadline: string
    description: string
    id: string
    order: number
    priority: TaskPriorities
    startDate: string
    status: TaskStatuses
    title: string
    todoListId: string
}
export type updateTaskModelType = {
    title: string
    description: string | null
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export enum Result_Code {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10

}


