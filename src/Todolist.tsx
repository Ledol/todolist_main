import React, {ChangeEvent, FC} from 'react';
import {FilterTaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

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
    editTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    editTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = (
    {
        todolistID, title, tasks, addNewTask, removeTask,
        changeTaskFilter, changeTaskStatus, filter, removeTodolist, editTaskTitle,
        editTodolistTitle
    }
) => {


    const changeTaskFilterHandler = (value: FilterTaskType) => {
        changeTaskFilter(todolistID, value)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }
    const editTodolistTitleHandler = (newTitle: string) => {
        editTodolistTitle(todolistID, newTitle)
    }

    const addTaskHandler = (newTitle: string) => {
        addNewTask (todolistID, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={editTodolistTitleHandler}/>
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
                    const editTitleHandler = (newTitle: string) => {
                        editTaskTitle(todolistID, task.id, newTitle)
                    }

                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <EditableSpan title={task.taskTitle} onChange={editTitleHandler}/>
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
