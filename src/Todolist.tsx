import React, {ChangeEvent, FC} from 'react';
import {FilterTaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";

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
    removeTodolist: (todolistID: string) => void
}

export const Todolist: FC<TodolistPropsType> = (
    {
        todolistID, title, tasks, addNewTask, removeTask,
        changeTaskFilter, changeTaskStatus, filter, removeTodolist
    }
) => {


    const changeTaskFilterHandler = (value: FilterTaskType) => {
        changeTaskFilter(todolistID, value)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }

    const addTaskHandler = (newTitle: string) => {
        addNewTask (todolistID, newTitle)
    }

    return (
        <div>
            <h3>
                {title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
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
