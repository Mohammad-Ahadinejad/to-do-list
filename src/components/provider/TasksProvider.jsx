import React, { useContext, createContext, useState } from 'react';
import {initPapers} from '../../db/initPapers'


const papersContext = createContext();
const papersContextDispatcher = createContext();
const tasksContext = createContext();
const tasksContextDispatcher = createContext();
const filteredTasksContext = createContext();
const filteredTasksContextDispatcher = createContext();

const TasksProviders = ({children}) => {

    const [papers, setPapers] = useState(initPapers);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    return ( 
            <papersContext.Provider value={papers}>
                <papersContextDispatcher.Provider value={setPapers}>
                    <tasksContext.Provider value={tasks}>
                        <tasksContextDispatcher.Provider value={setTasks}>
                            <filteredTasksContext.Provider value={filteredTasks}>
                                <filteredTasksContextDispatcher.Provider value={setFilteredTasks}>
                                    {children}
                                </filteredTasksContextDispatcher.Provider>
                            </filteredTasksContext.Provider>
                        </tasksContextDispatcher.Provider>
                    </tasksContext.Provider>
                </papersContextDispatcher.Provider>
            </papersContext.Provider>
    );
};

export default TasksProviders;
export const usePapers = ()=> useContext(papersContext);
export const useSetPapers = ()=> useContext(papersContextDispatcher);
export const useTasks = () => useContext(tasksContext);
export const useSetTasks = () => useContext(tasksContextDispatcher);
export const useFilteredTasks = () => useContext(filteredTasksContext);
export const useSetFilteredTasks = () => useContext(filteredTasksContextDispatcher);
export const useTasksActions = ()=>{
    const tasks = useContext(tasksContext);
    const setTasks = useContext(tasksContextDispatcher);
    const setFilteredTasks = useContext(filteredTasksContextDispatcher);
    
    const addTask = (newText)=>{
        const newTask = {
        id: Math.floor(Math.random()*1000),
        text: newText,
        isCompleted: false};
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        
    }
    const removeTask=(id)=>{
        const updatedTasks = tasks.filter(t=>t.id !== id);
        setTasks(updatedTasks);
    }
    const editTask=(id, newTask)=>{
        const index = tasks.findIndex(t=>t.id === id);
        const updatedTasks = [...tasks];
        updatedTasks[index] = newTask;
        setTasks(updatedTasks);
    }
    const checkTask=(id)=>{
        const index = tasks.findIndex((t)=>t.id === id);
        const updatedTasks = [...tasks];
        console.log(index);
        updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
        setTasks(updatedTasks);
    
    }
    const radioChangeHandler = (status)=>{
        switch (status){
            case "All":
                setFilteredTasks([...tasks]);
                break;
            case "Done":
                setFilteredTasks(tasks.filter(t=>t.isCompleted))
                break;
            case "Not done":
                setFilteredTasks(tasks.filter(t=>!t.isCompleted))
                break;
            default:
                setFilteredTasks([...tasks]);
                break;
        }
    }

    return {addTask, removeTask, editTask, checkTask, radioChangeHandler};
}