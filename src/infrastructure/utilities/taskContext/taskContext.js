import { createContext } from 'react';
import { useState } from 'react';



export const TaskContext = createContext()

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks
        }}
        >
            {children}
        </TaskContext.Provider>
    )
}