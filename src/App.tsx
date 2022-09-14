import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, taskTitle: 'HTML', isDone: true},
        {id: 2, taskTitle: 'CSS', isDone: true},
        {id: 3, taskTitle: 'JS', isDone: true},
        {id: 4, taskTitle: 'REACT', isDone: true},
        {id: 5, taskTitle: 'REDUX', isDone: false},
        {id: 6, taskTitle: 'ANGULAR', isDone: false},
    ])


    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }



    return (
        <div className="App">
            <Todolist tasks={tasks}
                      title='What to learn'
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
