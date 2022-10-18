import React, {useState} from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: "TODOLISTS/Task Component",
    component: Task,
    args:{
        changeTaskStatus: action ('changeTaskStatus'),
        changeTaskTitle: action ('changeTaskTitle'),
        removeTask: action ('removeTask'),
        todolistId: '1'
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolistID1',
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""},
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {id: '2', title: 'HTML', status: TaskStatuses.New, todoListId: 'todolistID1',
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""},
};

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '1', title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolistID1',
        startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""})
    const changeTaskStatus = () => {
        setTask({...task, status: task.status})
    }

    return <Task {...args} changeTaskStatus={changeTaskStatus} task={task} />
}

export const TaskStory = Template1.bind({})

