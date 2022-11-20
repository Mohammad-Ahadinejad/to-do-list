import React, {useEffect} from 'react';
import { usePapers,useSetPapers, useTasks, useSetTasks} from '../provider/TasksProvider';
import styles from './papersList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const PapersList = (props) => {
    const setPapers = useSetPapers();
    const papers = usePapers();
    const setTasks = useSetTasks();
    const tasks = useTasks();
    const {setShowPaper, setDate, mode, setMode} = props;
    
    useEffect(() => {if(tasks.length!==0) setShowPaper(true)},[tasks]);
    
    useEffect(()=>{
        setPapers(papers.sort((a,b)=>(a.date>b.date)? 1:-1))},
        [papers]);
    const dateClickHandler = (e)=>{
        const paper = papers.filter(paper=>{
            return paper.date==e.target.innerHTML;
        });        
        setTasks(paper[0].data);
        setDate(paper[0].date);
        setMode(!mode);
    }
    const deleteClickHandler = (e)=>{
        const answer = window.confirm('Are you sure you want to Remove this paper?');
        if(answer){
            const index = papers.findIndex(paper=>paper.date==e.target.value);
            const updatedPapers = [...papers];
            updatedPapers.splice(index,1);
            setPapers(updatedPapers);
        }
        
    }
    const renderFunc = ()=>{
        return(
            papers.map(paper=>{
                return(
                    <li className={styles.paper}>
                        <div 
                            className={styles.date} 
                            onClick={dateClickHandler}>
                            {paper.date}
                        </div>
                        <FontAwesomeIcon 
                            className={styles.trash} 
                            icon={faTrash} 
                            value={paper.date} 
                            onClick={deleteClickHandler}>
                            Delete
                        </FontAwesomeIcon>
                    </li>
                );
            })
        );

    }
    return (
        <ul className={styles.list}>
            {renderFunc()}
        </ul>
    );
}

export default PapersList;