import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    editTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task: FC<TaskPropsType> = React.memo(({removeTask, editTaskTitle, changeTaskStatus, task}) => {
    console.log('Task was call')
    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }
    const editTitleHandler = useCallback((newTitle: string) => {
        editTaskTitle(task.id, newTitle)
    }, [editTaskTitle])

    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} color='primary'/>
        <EditableSpan title={task.taskTitle} onChange={editTitleHandler}/>
        <IconButton onClick={removeTaskHandler}>
            <Delete/>
        </IconButton>
    </div>
});
