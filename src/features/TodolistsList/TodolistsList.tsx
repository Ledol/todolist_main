import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    addTodolistTC, changeTodolistFilterAC,
    changeTodolistTitleTC, FilterTaskType, getTodoTC,
    removeTodolistTC,
    TodolistDomainType
} from "../../state/todolists-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TaskStatuses} from "../../api/todolists-api";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../../state/tasks-reducer";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {ROUTS} from "../../AppWithRedux";



export const TodolistsList = () => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, unknown, AnyAction>>()

    useEffect(() => {
        if(!isLoggedIn){
            return;
        }
        dispatch(getTodoTC())
    }, [])

//CRUD todolists
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

//CRUD tasks
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



    if (!isLoggedIn) {
        return <Navigate to={ROUTS.LOGIN}/>
    }

    return ( <>
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
                                      entityStatus={tl.entityStatus}
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
    </>

    );
};
