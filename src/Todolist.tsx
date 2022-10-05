import React, {FC, memo, useCallback} from 'react';
import {FilterTaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./components/Task";


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
    filter: FilterTaskType
    removeTodolist: (todolistID: string) => void
    editTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    editTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist: FC<TodolistPropsType> = memo((
    {
        todolistID, title, tasks, addNewTask, removeTask,
        changeTaskFilter, changeTaskStatus, filter, removeTodolist, editTaskTitle,
        editTodolistTitle
    }
) => {
    console.log('Todolist called')
    const changeTaskFilterHandler = useCallback((value: FilterTaskType) => {
        changeTaskFilter(todolistID, value)
    }, [changeTaskFilter, todolistID])

    const removeTodolistHandler = () => {
        removeTodolist(todolistID)
    }
    const editTodolistTitleHandler = useCallback((newTitle: string) => {
        editTodolistTitle(todolistID, newTitle)
    }, [editTodolistTitle, todolistID])

    const addTaskHandler = useCallback((newTitle: string) => {
        addNewTask(todolistID, newTitle)
    }, [addNewTask, todolistID])

    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const changeTaskStatusHandler = useCallback((taskId: string, newIsDone: boolean) => {
        changeTaskStatus(todolistID, taskId, newIsDone)
    }, [changeTaskStatus, todolistID])
    const removeTaskHandler = useCallback((taskId: string) => {
        removeTask(todolistID, taskId)
    }, [removeTask, todolistID])
    const editTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        editTaskTitle(todolistID, taskId, newTitle)
    }, [editTaskTitle, todolistID])

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
                {filteredTasks.map(task => {
                    return  <Task key={task.id}
                                 task={task}
                                 changeTaskStatus={changeTaskStatusHandler}
                                 removeTask={removeTaskHandler}
                                 editTaskTitle={editTaskTitleHandler}/>

                    /*<TaskWithRedux key={task.id} task={task} todolistId={todolistID}/>*/


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
});
