import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterTaskType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), taskTitle: 'HTML', isDone: true},
        {id: v1(), taskTitle: 'CSS', isDone: true},
        {id: v1(), taskTitle: 'JS', isDone: true},
        {id: v1(), taskTitle: 'REACT', isDone: true},
        {id: v1(), taskTitle: 'REDUX', isDone: false},
        {id: v1(), taskTitle: 'ANGULAR', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterTaskType>('all')

    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    const changeTaskFilter = (newValue: FilterTaskType) => {
        setFilter(newValue)
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const addNewTask = (newTitle: string) => {
        let newTask = {id: v1(), taskTitle: newTitle, isDone: false};
        setTasks([newTask,...tasks])
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }




    return (
        <div className="App">
            <Todolist tasks={filteredTasks}
                      title='What to learn'
                      addNewTask={addNewTask}
                      removeTask={removeTask}
                      changeTaskFilter={changeTaskFilter}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
