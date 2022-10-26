import React, {useCallback, useEffect} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC, FilterTaskType, getTodoTC,
    removeTodolistTC, TodolistDomainType,
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC } from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, AnyAction>>()


    const addNewTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistTC(newTitle))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])
    const editTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTitle))
    }, [dispatch])
    const changeTodolistFilter = useCallback((todolistID: string, newValue: FilterTaskType) => {
        dispatch(changeTodolistFilterAC(todolistID, newValue))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistID, taskId, {status}))
    }, [dispatch])
    const editTaskTitle = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC(todolistID, taskId, {title: newTitle}))
    }, [dispatch])
    const addNewTask = useCallback((todolistID: string, newTitle: string) => {
        dispatch(addTaskTC(todolistID, newTitle))
    }, [dispatch])
    const removeTask = useCallback((todolistID: string, taskId: string) => {
        dispatch(removeTaskTC(todolistID, taskId))
    }, [dispatch])

    useEffect(() => {
      dispatch(getTodoTC())
    }, [])

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
                return <Grid item key={tl.id}>
                    <Paper style={{padding: '10px'}}>
                <Todolist key={tl.id}
                                 todolistID={tl.id}
                                 title={tl.title}
                                 tasks={tasks[tl.id]}
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

export default AppWithRedux;
