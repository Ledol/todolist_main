import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";
import {FilterTaskType, TodolistDomainType} from "./state/todolists-reducer";
import {TaskDomainType, TasksStateType} from "./state/tasks-reducer";



function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: "", entityStatus: "idle"},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: "", entityStatus: "idle"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle"
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle"
            },
            {
                id: v1(), title: 'ReactJS', status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle"
            },
        ],
        [todolistID2]: [
            {
                id: v1(), title: 'Bread', status: TaskStatuses.Completed, todoListId: todolistID1,
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle",
            },
            {
                id: v1(), title: 'Oil', status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle"
            },
        ]
    })

    const addNewTodolist = (newTitle: string) => {
        let newTodolistID = v1();
        let newTodolist: TodolistDomainType = {
            id: newTodolistID,
            title: newTitle,
            filter: 'all',
            order: 0,
            addedDate: "",
            entityStatus: "idle"
        };
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
    }
    const editTodolistTitle = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }
    const changeTodolistFilter = (todolistID: string, newValue: FilterTaskType) => {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: newValue} : tl))
    }

    const changeTaskStatus = (todolistID: string, taskId: string, status: TaskStatuses) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, status: status} : t)})

    }
    const editTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, taskTitle: newTitle} : t)
        })
    }
    const addNewTask = (todolistId: string, newTitle: string) => {
        let newTask:TaskDomainType = {
            id: v1(), title: newTitle, status: TaskStatuses.New, todoListId: todolistId,
            startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle"
        };
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId)})
    }


    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addNewTodolist}/>
                </Grid>

                <Grid container spacing={3}>
                    {todolists.map(tl => {

                        let filteredTasks = tasks[tl.id];
                        if (tl.filter === 'active') {
                            filteredTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                        }
                        if (tl.filter === 'completed') {
                            filteredTasks = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
                        }

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist key={tl.id}
                                          todolistID={tl.id}
                                          title={tl.title}
                                          entityStatus={tl.entityStatus}
                                          tasks={filteredTasks}
                                          addNewTask={addNewTask}
                                          removeTask={removeTask}
                                          changeTaskFilter={changeTodolistFilter}
                                          changeTaskStatus={changeTaskStatus}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                          editTaskTitle={editTaskTitle}
                                          editTodolistTitle={editTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default App;
