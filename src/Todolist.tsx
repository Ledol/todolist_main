import React, {FC} from 'react';

export type TaskType = {
    id: number
    taskTitle: string
    isDone: boolean
}


type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
}

export const Todolist: FC<TodolistPropsType> = ({title, tasks, removeTask}) => {
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

                    return  <li>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.taskTitle}</span>
                        <button onClick={removeTaskHandler}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
