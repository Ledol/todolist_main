import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '36c6d8e6-c7f6-48a8-984f-4e1b0d11ee5b',
    },
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            { title },
            settings
        )
    },
    deleteTodolist(todolistId: string) {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings
        )
    },
    createTodolist(title: string) {
        return axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists`,
            { title },
            settings
        )
    },
    getTodolists() {
        return axios.get(
            `https://social-network.samuraijs.com/api/1.1/todo-lists`,
            settings
        )
    },
}