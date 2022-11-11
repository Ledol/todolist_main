import React, { useEffect } from "react";
import "./App.css";

// import MUI
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu } from "@mui/icons-material";
import { ErrorSnackbar } from "./components/ErrorSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { RequestStatusType } from "./state/app-reducer";
import { TodolistsList } from "./features/TodolistsList/TodolistsList";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./features/Login/Login";
import { initializeAppTC, logoutTC } from "./state/authReducer";
import { CircularProgress } from "@mui/material";

type PropsType = {
  demo?: boolean;
};

export enum ROUTS {
  DEFAULT = "/",
  LOGIN = "/login",
  NOT_FOUND = "/404",
}

function AppWithRedux({ demo = false }: PropsType) {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  const isInitialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();

  const isLogoutHandler = () => {
    dispatch(logoutTC());
  };

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  console.log(isInitialized);
  debugger;
  return (
    <div className="App">
      {!isInitialized ? (
        <div
          style={{
            position: "fixed",
            top: "30%",
            textAlign: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
          <ErrorSnackbar />
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu />
              </IconButton>
              <Typography variant="h6">Todolist</Typography>
              {isLoggedIn && (
                <Button color="inherit" onClick={isLogoutHandler}>
                  Log out
                </Button>
              )}
            </Toolbar>
            {status === "loading" && <LinearProgress color={"inherit"} />}
          </AppBar>
          <Container fixed>
            <Routes>
              <Route
                path={ROUTS.DEFAULT}
                element={<TodolistsList demo={demo} />}
              />
              <Route path={ROUTS.LOGIN} element={<Login />} />
              <Route
                path={ROUTS.NOT_FOUND}
                element={
                  <h1 style={{ textAlign: "center" }}>404: PAGE NOT FOUND</h1>
                }
              />
              <Route path="*" element={<Navigate to={ROUTS.NOT_FOUND} />} />
            </Routes>
          </Container>
        </>
      )}
    </div>
  );
}

export default AppWithRedux;
