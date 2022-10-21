import React, {ChangeEvent, FC, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";


type TaskWithReduxPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux: FC<TaskWithReduxPropsType> = memo(({task, todolistId}) => {
    console.log('Task was call')
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todolistId, task.id ))
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked ? TaskStatuses.Completed: TaskStatuses.New ))
    }
    const editTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, newTitle ))
    }

    return <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox checked={task.status === TaskStatuses.Completed } onChange={changeTaskStatusHandler} color='primary'/>
        <EditableSpan title={task.title} onChange={editTitleHandler}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
});
