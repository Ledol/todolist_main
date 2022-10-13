import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '36c6d8e6-c7f6-48a8-984f-4e1b0d11ee5b'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
           .then((res) => {
               setState(res.data)
           })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "newTodolist"}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2861933c-059d-4cc3-b068-f0ec51ac3d18'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings)
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

        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: "REACT >>>>>>"}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

