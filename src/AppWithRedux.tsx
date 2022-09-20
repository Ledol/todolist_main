import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addNewTodolist = useCallback((newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }, [dispatch])
    const editTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }, [dispatch])
    const changeTodolistFilter = useCallback((todolistID: string, newValue: FilterTaskType) => {
        dispatch(changeTodolistFilterAC(todolistID, newValue))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistID: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, newIsDone))
    }, [dispatch])
    const editTaskTitle = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }, [dispatch])
    const addNewTask = useCallback((todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle))
    }, [dispatch])
    const removeTask = useCallback((todolistID: string, taskId: string) => {
        dispatch(removeTaskAC(todolistID, taskId))
    }, [dispatch])


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
