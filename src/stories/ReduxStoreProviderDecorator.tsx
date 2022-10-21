import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState:AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: ""},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: ""}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: "", deadline: "", addedDate: "", order: 0, priority: TaskPriorities.Low, description: ""}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}