import {TasksActionsType, tasksReducer} from './tasks-reducer'
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer'
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//все типы actions для всего app
export type AppActionsType = TodolistsActionsType | TasksActionsType

// ThunkAction для типизации TC при диспатче action and thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
