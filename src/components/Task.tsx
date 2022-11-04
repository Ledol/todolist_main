import React, {ChangeEvent, FC, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {RequestStatusType} from "../state/app-reducer";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses) => void
    editTaskTitle: (taskId: string, newTitle: string) => void
    entityStatus: RequestStatusType
}

export const Task: FC<TaskPropsType> = memo((
    {removeTask, editTaskTitle, changeTaskStatus, task, entityStatus}
) => {
    console.log('Task was call')
    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const changeTaskStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    },[task.id])
    const editTitleHandler = useCallback((newTitle: string) => {
        editTaskTitle(task.id, newTitle)
    }, [editTaskTitle, task.id])

    return <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler} color='primary'/>
        <EditableSpan title={task.title} onChange={editTitleHandler} disabled={entityStatus === 'loading'}/>
        <IconButton onClick={removeTaskHandler} disabled={entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </div>
});
