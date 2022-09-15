import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";

export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterTaskType

}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), taskTitle: 'HTML&CSS', isDone: true},
            {id: v1(), taskTitle: 'JS', isDone: true},
            {id: v1(), taskTitle: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), taskTitle: 'Bread', isDone: true},
            {id: v1(), taskTitle: 'Oil', isDone: false},
        ]
    })

    const addNewTodolist = (newTitle: string) => {
        let newTodolistID = v1();
        let newTodolist:TodolistsType = {id: newTodolistID, title: newTitle, filter: 'all'};
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
    }
    const editTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }

    const changeTaskFilter = (todolistID: string, newValue: FilterTaskType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: newValue} : tl))
    }
    const changeTaskStatus = (todolistID: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})

    }

    const editTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t=> t.id === taskId ? {...t, taskTitle: newTitle} : t)})
    }
    const addNewTask = (todolistID: string, newTitle: string) => {
        let newTask = {id: v1(), taskTitle: newTitle, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
    }


    return (
        <div className="App">
            <AddItemForm addItem={addNewTodolist}/>

            {todolists.map(tl => {

                let filteredTasks = tasks[tl.id];
                if (tl.filter === 'active') {
                    filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone)
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
                                 removeTodolist={removeTodolist}
                                 editTaskTitle={editTaskTitle}
                                 editTodolistTitle={editTodolistTitle}
                />
            })}


        </div>
    );
}

export default App;
