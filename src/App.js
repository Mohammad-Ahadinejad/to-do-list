import React, { useState } from "react";
import Paper from "./components/paper/Paper"
import Navbar from "./components/navbar/Navbar"
import TasksProvider from "./components/provider/TasksProvider";
import styles from "./app.module.css"
import moment from 'moment';
import PapersList from "./components/papersList/PapersList";
import {useTasks} from './components/provider/TasksProvider';

const App = () => {
  const [showPaper, setShowPaper] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [mode, setMode] = useState(true);
  return (

      <TasksProvider>
        <div className={styles.container}>
          <div className={styles.navbar}>
            <Navbar showPaper={showPaper} 
                    setShowPaper = {setShowPaper} 
                    date={date}
                    mode={mode}
                    setMode={setMode} />
          </div>
          <div className={styles.content}>
            <div className={`${styles.papersList} ${mode? styles.mode1:styles.mode2}`}>
              <PapersList setShowPaper = {setShowPaper} setDate={setDate} mode={mode} setMode={setMode}/>
            </div>
            <div className={`${styles.paper} ${mode? styles.mode1:styles.mode2}`}>
              {showPaper && <Paper  date={date} setDate={setDate}/>}
            </div>
          </div>
        </div>
      </TasksProvider >     
    
  );
};

export default App;