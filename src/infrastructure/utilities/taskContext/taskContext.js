import { createContext, useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const TaskContext = createContext()

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        (async function getTaskStorage() {
            const tasks = await AsyncStorage.getItem("@tasks")
            if (tasks != null) {
                setTasks(JSON.parse(tasks))
            }
        })
    },[])

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