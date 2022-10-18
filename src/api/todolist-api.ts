import axios from 'axios'

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': '36c6d8e6-c7f6-48a8-984f-4e1b0d11ee5b',
    },
})

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
    items: TaskType[]
    totalCount:number
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

type updateTaskType = {
    title: string
    description: string| null
    status: number
    priority: number
    startDate: string| null
    deadline: string| null
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
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
        return instance.post<ResponseType<{ item: TodolistType }>>(
            `todo-lists`,
            {title},
        )
    },
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists` )
    },

    getTasks(todolistId: string) {
        return instance.get<getTaskType>(
            `todo-lists/${todolistId}/tasks`,
        )
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>(
            `todo-lists/${todolistId}/tasks`,
            {title},
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
        )
    },
    updateTask(todolistId: string, taskId: string, model: updateTaskType ) {
        return instance.put<ResponseType<updateTaskType>> (
            `todo-lists/${todolistId}/tasks/${taskId}`,
            model
        )
    },
}