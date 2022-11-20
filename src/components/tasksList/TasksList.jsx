import React,{useState, useRef} from 'react';
import { useTasksActions, useFilteredTasks } from '../provider/TasksProvider';
import styles from './tasksList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCheck, faPen, faMultiply } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';

const TasksList = () => {
    const {removeTask, editTask, checkTask} = useTasksActions();
    const [edit, setEdit] = useState({id:null, text:"", isCompleted:false});
    const [editMode, setEditMode] = useState({status:false, id:-1});
    const filteredTasks = useFilteredTasks();
    const inputEditRef = useRef(null);

    useEffect(()=>{editMode.status && inputEditRef.current.focus();});

    const editStart = (id)=>{
        setEditMode({status:true, id:id});
        setEdit({id:Math.floor(Math.random()*1000), text:filteredTasks.find(t=>{return t.id===id}).text, isCompleted:false});
    }
    const changeHandler = (e)=>{
        setEdit({id:Math.floor(Math.random()*1000), text:e.target.value, isCompleted:false});
    }

    const dissmissHandler = ()=>{
        setEditMode({status:false, id:-1});
    }

    const changeHandlerBtn = (id)=>{
        editTask(id,edit);
        dissmissHandler();
    }

    const renderFunc = ()=>{
        if(filteredTasks.length===0) return;
        return filteredTasks.map(task=>{
            if(editMode.status && editMode.id===task.id){
                return(
                    <div className={styles.task} key={task.id}>
                        <div>
                            {task.isCompleted ? <FontAwesomeIcon icon={faCheck} className={styles.btnCheck1}></FontAwesomeIcon>:
                                                <FontAwesomeIcon icon={faCheck} className={styles.btnCheck2}></FontAwesomeIcon>} 
                            <input ref={inputEditRef} className={styles.editInput} type="text" defaultValue={filteredTasks.filter(t=>t.id===task.id)[0].text} onChange={changeHandler}></input>                        
                        </div>
                        <div className={styles.taskGroup2}>
                            <FontAwesomeIcon className={styles.btnGroup2} icon={faCheck} type="submit" onClick={()=>changeHandlerBtn(task.id)}>change</FontAwesomeIcon>
                            <FontAwesomeIcon className={styles.btnGroup2} icon={faMultiply} type="submit" onClick={dissmissHandler}>Dismiss</FontAwesomeIcon>
                        </div> 
                    </div>
                );
            }
            else{
                return(
                    <div className={styles.task} key={task.id}>
                        <div className={styles.taskGroup1}>
                            {task.isCompleted ? <FontAwesomeIcon icon={faCheck} className={styles.btnCheck1}></FontAwesomeIcon>:
                                                <FontAwesomeIcon icon={faCheck} className={styles.btnCheck2}></FontAwesomeIcon>} 
                            <p onClick={()=>checkTask(task.id)}>{task.text}</p>
                        </div>
                        <div className={styles.taskGroup2}>
                            <FontAwesomeIcon className={styles.btnGroup2} icon={faEdit} onClick={()=>editStart(task.id)}></FontAwesomeIcon>
                            <FontAwesomeIcon className={styles.btnGroup2} icon={faTrash} onClick={()=>removeTask(task.id)}></FontAwesomeIcon>
                        </div>                       
                    </div>
                );
            }
        })                
    }

    return(
        <div>{renderFunc()}</div>
    )
}


export default TasksList ;