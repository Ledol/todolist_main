import React, {ChangeEvent, FC} from 'react';
import {FilterTaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import { Delete} from "@mui/icons-material";

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
        addNewTask(todolistID, newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={editTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <div>
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

                    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} color='primary'/>
                        <EditableSpan title={task.taskTitle} onChange={editTitleHandler}/>
                        <IconButton onClick={removeTaskHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })}
            </div>
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={() => changeTaskFilterHandler('all')}
                        color='inherit'
                >All
                </Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={() => changeTaskFilterHandler('active')}
                        color='primary'
                >Active
                </Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={() => changeTaskFilterHandler('completed')}
                        color='secondary'
                >Completed
                </Button>
            </div>
        </div>
    );
};
