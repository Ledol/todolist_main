import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {


    let todolistID1 = v1()
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
    })

    const addNewTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchTodolists(action)
        dispatchTasks(action)
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

    const changeTaskStatus = (todolistID: string, taskId: string, newIsDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistID, taskId, newIsDone))

    }
    const editTaskTitle = (todolistID: string, taskId: string, newTitle: string) => {
        dispatchTasks(changeTaskTitleAC(todolistID, taskId, newTitle))
    }
    const addNewTask = (todolistID: string, newTitle: string) => {
        dispatchTasks(addTaskAC(todolistID, newTitle))
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
                    filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    filteredTasks = tasks[tl.id].filter(t => t.isDone)
                }

                return <Grid item>
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

export default AppWithReducer;
