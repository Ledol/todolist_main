import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterTaskType} from "./App";

export type TaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}


type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    addNewTask: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskFilter: (todolistID: string, newValue: FilterTaskType) => void
    changeTaskStatus: (todolistID: string, taskId: string, newIsDone: boolean) => void
    filter: string
}

export const Todolist: FC<TodolistPropsType> = (
    {
        todolistID, title, tasks, addNewTask, removeTask,
        changeTaskFilter, changeTaskStatus, filter
    }
) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addNewTaskHandler = () => {

        if (newTitle.trim() !== '') {
            addNewTask(todolistID, newTitle)
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addNewTaskHandler()
        }
    }
    const changeTaskFilterHandler = (value: FilterTaskType) => {
        changeTaskFilter(todolistID, value)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addNewTaskHandler}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {tasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(todolistID, task.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todolistID, task.id, e.currentTarget.checked)
                    }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{task.taskTitle}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={filter == 'all' ? 'active-filter' : ''}
                        onClick={() => changeTaskFilterHandler('all')}>All
                </button>
                <button className={filter == 'active' ? 'active-filter' : ''}
                        onClick={() => changeTaskFilterHandler('active')}>Active
                </button>
                <button className={filter == 'completed' ? 'active-filter' : ''}
                        onClick={() => changeTaskFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>
    );
};
