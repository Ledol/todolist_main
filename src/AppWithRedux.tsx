import React, {useEffect} from 'react';
import './App.css';

// import MUI
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import LinearProgress from "@mui/material/LinearProgress"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import {Menu} from "@mui/icons-material";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./state/app-reducer";
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {initializeAppTC} from "./state/authReducer";


export enum ROUTS {
    DEFAULT = '/',
    LOGIN = '/login',
    NOT_FOUND = '/404',
}

function AppWithRedux() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress color={'inherit'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path ={ROUTS.DEFAULT} element={<TodolistsList/>}/>
                    <Route path ={ROUTS.LOGIN} element={<Login/>}/>
                    <Route path ={ROUTS.NOT_FOUND} element={<h1 style={{textAlign: 'center'}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path ='*' element={<Navigate to={ROUTS.NOT_FOUND}/>}/>

                </Routes>

            </Container>
        </div>
    );
}

export default AppWithRedux;
