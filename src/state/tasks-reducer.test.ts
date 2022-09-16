
import { TasksStateType } from '../App'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    })
})
test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].taskTitle).toBe('juce')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})
test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = changeTaskTitleAC('3', 'ANGULAR', 'todolistId1')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][2].taskTitle).toBe('tea')
    expect(endState['todolistId1'][2].taskTitle).toBe('ANGULAR')
})
