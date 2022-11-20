import React from 'react';
import {usePapers, useSetPapers, useTasks, useSetTasks } from '../provider/TasksProvider';
import styles from './navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'
const Navbar = (props) => {
    const {showPaper, setShowPaper, date, mode, setMode} = props;
    const papers = usePapers();
    const setPapers = useSetPapers();
    const tasks = useTasks();
    const setTasks = useSetTasks();
    


    const newPaperBtn = ()=>{
        setTasks([]);
        setShowPaper(true);
        setMode(true);
    }
    const savePaperBtn = ()=>{
        if(tasks.length===0) return;
        if(papers.some(paper=>{return paper.date==date})){
            const answer = window.confirm("There is already a peper with the same date. Are you sure you want to rewrite?");
            if (!answer) {
                return;
            }
        }       
        let obj = {};
        obj.date = date;
        obj.data = tasks;
        setPapers([...papers.filter((p)=>{return p.date!=date}), obj]);
        discardPaperBtn();    
        setMode(true);
    }
    const discardPaperBtn=()=>{
        setTasks([]);
        setShowPaper(false);
        setMode(true);
    }

    const menuHandler = ()=>{
        setMode(!mode);
    }
    return ( 
        <nav>
            <FontAwesomeIcon className={styles.btnMenu} onClick={menuHandler} icon={faArchive} ></FontAwesomeIcon>
            <div className={styles.navbar}>
                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={newPaperBtn} disabled={showPaper}>New Paper</button>
                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={savePaperBtn} disabled={!tasks.length}>Save Paper</button>
                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={discardPaperBtn} disabled={!showPaper}>Discard Paper</button>
            </div>            
        </nav>
    );
}

export default Navbar;