import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterTaskType} from "./App";

export type TaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    addNewTask: (newTitle: string) => void
    removeTask: (taskId: string) => void
    changeTaskFilter: (newValue: FilterTaskType) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
}

export const Todolist: FC<TodolistPropsType> = (
    {title, tasks, addNewTask , removeTask, changeTaskFilter, changeTaskStatus}) => {

    const [newTitle, setNewTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addNewTaskHandler = () => {
        if(newTitle.trim() !== '') {
            addNewTask(newTitle)
            setNewTitle('')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeTitleHandler} onKeyDown={onKeyDownHandler}/>
                <button onClick={addNewTaskHandler} >+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(task.id, e.currentTarget.checked)
                    }

                    return <li key={task.id}>
                        <input type="checkbox"
                               checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{task.taskTitle}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button onClick={() => changeTaskFilter('all')}>All</button>
                <button onClick={() => changeTaskFilter('active')}>Active</button>
                <button onClick={() => changeTaskFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};
