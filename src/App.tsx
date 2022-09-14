import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterTaskType

}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'all'},
            {id: v1(), title: 'What to buy', filter: 'active'},
        ]
    )


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), taskTitle: 'HTML', isDone: true},
        {id: v1(), taskTitle: 'CSS', isDone: true},
        {id: v1(), taskTitle: 'JS', isDone: true},
        {id: v1(), taskTitle: 'REACT', isDone: true},
        {id: v1(), taskTitle: 'REDUX', isDone: false},
        {id: v1(), taskTitle: 'ANGULAR', isDone: false},
    ])
    //const [filter, setFilter] = useState<FilterTaskType>('all')



    const changeTaskFilter = (todolistID: string, newValue: FilterTaskType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: newValue} : tl))
       // setFilter(newValue)
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

            {todolists.map(tl => {

                let filteredTasks = tasks;
                if (tl.filter === 'active') {
                    filteredTasks = tasks.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    filteredTasks = tasks.filter(t => t.isDone)
                }

                return <Todolist key={tl.id}
                                 todolistID={tl.id}
                                 title={tl.title}
                                 tasks={filteredTasks}
                                 addNewTask={addNewTask}
                                 removeTask={removeTask}
                                 changeTaskFilter={changeTaskFilter}
                                 changeTaskStatus={changeTaskStatus}
                                 filter={tl.filter}
                />
            })}


        </div>
    );
}

export default App;
