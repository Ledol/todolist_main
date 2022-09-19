import React from 'react';
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


   /* let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), taskTitle: 'HTML&CSS', isDone: true},
            {id: v1(), taskTitle: 'JS', isDone: true},
            {id: v1(), taskTitle: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), taskTitle: 'Bread', isDone: true},
            {id: v1(), taskTitle: 'Oil', isDone: false},
        ]
    })*/

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const addNewTodolist = (newTitle: string) => {
        dispatch(addTodolistAC(newTitle))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))

    }
    const editTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }
    const changeTodolistFilter = (todolistID: string, newValue: FilterTaskType) => {
        dispatch(changeTodolistFilterAC(todolistID, newValue))
    }

    const changeTaskStatus = (todolistID: string, taskId: string, newIsDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, newIsDone))

    }
    const editTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }
    const addNewTask = (todolistID: string, newTitle: string) => {
        dispatch(addTaskAC(todolistID, newTitle))
    }
    const removeTask = (todolistID: string, taskId: string) => {
        dispatch(removeTaskAC(todolistID, taskId))
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
                    filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone)
                }

                return <Grid item key={tl.id}>
                    <Paper style={{padding: '10px'}}>
                <Todolist key={tl.id}
                                 todolistID={tl.id}
                                 title={tl.title}
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

export default AppWithRedux;
