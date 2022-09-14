import React, {FC} from 'react';
import {FilterTaskType} from "./App";

export type TaskType = {
    id: number
    taskTitle: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeTaskFilter: (newValue: FilterTaskType) => void
}

export const Todolist: FC<TodolistPropsType> = (
    {title, tasks, removeTask, changeTaskFilter}) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    const removeTaskHandler = () => {
                        removeTask(task.id)
                    }

                    return <li>
                        <input type="checkbox" checked={task.isDone}/>
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
