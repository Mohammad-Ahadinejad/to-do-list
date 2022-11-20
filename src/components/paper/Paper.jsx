import React,{useEffect, useState, useRef} from 'react';
import TasksList from '../tasksList/TasksList';
import { useTasksActions, useTasks } from '../provider/TasksProvider';
import moment from 'moment';
import styles from './paper.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Paper = (props) => {
    const {date,setDate} = props;
    const [status, setStatus] = useState("All");
    const [task, setTask] = useState("");
    const {addTask, radioChangeHandler} = useTasksActions();
    const tasks = useTasks();
    const [afterPlus, setAfterPlus] = useState(false);
    const inputAddRef = useRef(null);
    
    useEffect(()=>radioChangeHandler(status),[status,tasks]);

    const changeHandler = (e)=>{
        setTask(e.target.value);
    }

    const submitHandler = (e)=>{
        if(afterPlus){
            e.preventDefault();
            if(!task) return;
            addTask(task);
            setTask("");
        }
        else{
            setAfterPlus(true);
        }       
        inputAddRef.current.focus();
    }

    const changeRdb = (e)=>{
        setStatus(e.target.value)
    }

    const onChangeDate = (e)=>{
        const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
        setDate(newDate);
    }

    return (
        <div className={styles.paper}>
            <div>
                <div className={styles.dateBox}>
                    <label>Date:</label> 
                    <input 
                        type="date" 
                        onChange={onChangeDate} 
                        value={date} >
                    </input>
                </div>
                <div className={styles.radioBtns} onChange={changeRdb}>
                    <label>
                        <input type="radio" value="All" id="All" name="cat" checked={status === "All"}/>
                        <span>All</span>
                    </label>
                    <label>
                        <input type="radio" value="Done" id="Done" name="cat" checked={status === "Done"}/>
                        <span>Done</span> 
                    </label>
                    <label>
                        <input type="radio" value="Not done" id="Not done" name="cat" checked={status === "Not done"} />
                        <span>Not done</span> 
                    </label>
                </div>          
                <div>
                    <TasksList />
                    <form className={styles.add} onSubmit={submitHandler}>
                        <input ref={inputAddRef} className={`${styles.inputDefault} ${afterPlus? styles.inputPlus2:styles.inputPlus1} `} type="text" value={task} onChange={changeHandler}/>
                        <FontAwesomeIcon className={`${styles.btnPlus1} ${afterPlus && styles.btnPlus2}`} onClick={submitHandler} icon={faPlus}  type="submit">Add</FontAwesomeIcon>
                    </form>
                </div>               
            </div>
        </div>
    );
}

export default Paper;