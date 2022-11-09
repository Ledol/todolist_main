import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./features/TodolistsList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterTaskType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskTC,
    updateTaskAC,
    removeTaskAC,
    tasksReducer
} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";
import {useDispatch} from "react-redux";


function AppWithReducer() {
    console.log('AppWithReducer')

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: "", entityStatus: "idle"},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 0, addedDate: "", entityStatus: "idle"},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle"
            },
            {
                id: v1(), title: 'Oil', status: TaskStatuses.New, todoListId: todolistID1,
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: "",entityStatus: "idle"
            },
        ]
    })
    const dispatch = useDispatch()

    const addNewTodolist = (newTitle: string) => {
        /*let action = addTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchTasks(action)*/
        dispatch(addTodolistTC(newTitle))
    }
    const removeTodolist = (todolistID: string) => {
        dispatchTodolists(removeTodolistAC(todolistID))
        dispatchTasks(removeTodolistAC(todolistID))
    }
    const editTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistID, newTitle))
    }
    const changeTodolistFilter = (todolistID: string, newValue: FilterTaskType) => {
        dispatchTodolists(changeTodolistFilterAC(todolistID, newValue))
    }

    const changeTaskStatus = (todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatchTasks(updateTaskAC(todolistID, taskId, {status}))

    }
    const editTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        dispatchTasks(updateTaskAC(todolistID, taskId, {title: newTitle}))
    }
    const addNewTask = (todolistID: string, newTitle: string) => {

        dispatch(addTaskTC(todolistID, newTitle))
    }
    const removeTask = (todolistID: string, taskId: string) => {
        dispatchTasks(removeTaskAC(todolistID, taskId))
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

export default AppWithReducer;
