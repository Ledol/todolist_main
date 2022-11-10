import React, {FC, memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../../../components/Task";
import {TaskStatuses} from "../../../api/todolists-api";
import {FilterTaskType} from "../../../state/todolists-reducer";
import {useDispatch} from "react-redux";
import {getTasksTC, TaskDomainType} from "../../../state/tasks-reducer";
import {RequestStatusType} from "../../../state/app-reducer";


type TodolistPropsType = {
    todolistID: string
    title: string
    entityStatus: RequestStatusType
    tasks: Array<TaskDomainType>
    addNewTask: (todolistID: string, newTitle: string) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskFilter: (todolistID: string, newValue: FilterTaskType) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    filter: FilterTaskType
    removeTodolist: (todolistID: string) => void
    editTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    editTodolistTitle: (todolistID: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist: FC<TodolistPropsType> = memo((
    {
        todolistID, title, tasks, addNewTask, removeTask, changeTaskFilter,
        changeTaskStatus, filter, removeTodolist, editTaskTitle, editTodolistTitle, entityStatus,
        demo
    }
) => {
    console.log('Todolist called')
    const dispatch = useDispatch()

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

    let filteredTasks= tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const changeTaskStatusHandler = useCallback((taskId: string, status: TaskStatuses) => {
        changeTaskStatus(todolistID, taskId, status)
    }, [changeTaskStatus, todolistID])
    const removeTaskHandler = useCallback((taskId: string) => {
        removeTask(todolistID, taskId)
    }, [removeTask, todolistID])
    const editTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        editTaskTitle(todolistID, taskId, newTitle)
    }, [editTaskTitle, todolistID])

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTasksTC(todolistID))
    }, [])

    return (
        <div>
            <h3>
                <EditableSpan title={title} onChange={editTodolistTitleHandler} disabled={entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"}/>
            <div>
                {filteredTasks.map(task => {
                    return <Task key={task.id}
                                 task={task}
                                 changeTaskStatus={changeTaskStatusHandler}
                                 removeTask={removeTaskHandler}
                                 editTaskTitle={editTaskTitleHandler}
                                 entityStatus={task.entityStatus}
                    />

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
