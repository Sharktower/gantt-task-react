import React, {Fragment} from "react";
import { ItemComponent } from "./components/task-list-item-component";
import { Task } from "../../types/public-types";
import { PhaseComponent } from './components/task-list-phase-component'

type TaskListInputPhaseProps = {
    tasks: Task[],
    onIsEditing: () => void,
    handleNewPhaseTask: (idx: number) => void;
    handleSaveTask: (idx: number, item: Task) => void,
    handleDeleteTask: (idx: number) => void, 
}

export const TaskListEdit = ({ tasks, handleNewPhaseTask, handleSaveTask, handleDeleteTask } : TaskListInputPhaseProps ) => {

  const handleDeletePhaseTask = (phaseIndex: number, phaseTaskIndex: number | undefined) => {
    const newTask = tasks[phaseIndex]
    newTask.activities = newTask.activities.slice(phaseTaskIndex, 0)
    handleSaveTask(phaseIndex, newTask)
  }
  
  return (
    <div style={{padding: '10px'}}>      
      {tasks.map((task: Task, idx: number) => {
        // IF NOT PHASE, THEN ORPHAN TASK
        if(task.type !== 'project') {
          return <ItemComponent 
            task={task} 
            handleSaveTask={handleSaveTask} 
            handleDeleteTask={handleDeleteTask} 
            index={idx} 
            hasPhase={false}
            key={idx}
          />
        } else {
          // IS PHASE, RENDER PROJECT COMPONENT AND ANY ASSOCIATED ACTIVITIES WITH IT.
          console.log("HELLW!", task)
          return( 
            <Fragment>
              <PhaseComponent 
                phase={task} 
                handleDelete={handleDeleteTask} 
                handleSave={handleSaveTask} 
                handleNewPhaseTask={handleNewPhaseTask} 
                index={idx}
                key={idx}
              />
              {task.activities.map((a: Task, i: number) => 
                  <ItemComponent 
                    task={a} 
                    index={i}
                    handleSaveTask={handleSaveTask} 
                    handleDeleteTask={(idx, i) => handleDeletePhaseTask(idx, i)} 
                    hasPhase
                    key={i}
                  />
                )
              } 
            </Fragment>
            )
        }
      })} 
    </div>
      
  );
};
