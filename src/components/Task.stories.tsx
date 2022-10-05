import React, {useState} from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";

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
    task: {id: '1', taskTitle: 'CSS', isDone: true},
};

export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {id: '2', taskTitle: 'HTML', isDone: false},
};

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({id: '1', taskTitle: 'CSS', isDone: true})
    const changeTaskStatus = () => {
        setTask({...task, isDone: !task.isDone})
    }

    return <Task {...args} changeTaskStatus={changeTaskStatus} task={task} />
}

export const TaskStory = Template1.bind({})

