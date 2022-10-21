import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                debugger
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist("NEW-TODOLIST")
            .then((res)=> {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '897887a5-a7fe-4fa1-b704-66aa868b7386'
        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '20f44994-13c1-499c-9504-b2dbf5f1634b'
        todolistsApi.updateTodolist(todolistId, "NEW TITLE")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3860304f-92da-4aee-b636-c8a1f561e1f6'
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data.items)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '76332976-7428-4af5-8ba5-b86e3d1c64af'
        todolistsApi.createTask(todolistId, "TASK 4")
            .then((res)=> {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '76332976-7428-4af5-8ba5-b86e3d1c64af'
        const taskId = '31da523e-dc84-4b91-96f3-fbd49342f0ff'
        todolistsApi.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '76332976-7428-4af5-8ba5-b86e3d1c64af'
        const taskId = 'a938fe83-d9af-49e9-9b1b-a1c33a2f331c'
        const model = {
            title: "UPDATED-TASK 4",
            description: null,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
        }
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
