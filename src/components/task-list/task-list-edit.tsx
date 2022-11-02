import React from "react";
import { ItemComponent } from "./components/task-list-item-component";
import { Task } from "../../types/public-types";
import { PhaseComponent } from './components/task-list-phase-component'

type TaskListInputPhaseProps = {
    tasks: Task [],
    onIsEditing: () => void,
    handleNewPhaseTask: (idx: number) => void;
    handleSaveTask: (idx: number, item: Task) => void,
    handleDeleteTask: (idx: number) => void, 
}

export const TaskListEdit = ({ tasks, handleNewPhaseTask, handleSaveTask, handleDeleteTask } : TaskListInputPhaseProps ) => {

  const handleOnDeleteTask = (idx: number) => handleDeleteTask(idx)

  const handleDeletePhaseTask = (phaseIndex: number, phaseTaskIndex: number) => {
    const newTask = tasks[phaseIndex]
    const newTaskActivities = [...newTask.activities]
    newTask.activities = newTaskActivities.splice(phaseTaskIndex, 1)
    handleSaveTask(phaseIndex, newTask)
  }

  const handleSavePhaseTask = (phaseIndex: number, task: Task) => {
    const newTask = tasks[phaseIndex];
    newTask.activities.push(task)
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
            handleDeleteTask={() => handleOnDeleteTask(idx)} 
            index={idx} 
            hasPhase={false}
            readOnly={false}
            headerOverride
          />
        } else {
          // IS PHASE, RENDER PROJECT COMPONENT AND ANY ASSOCIATED ACTIVITIES WITH IT.
          return( 
            <span key={Math.random()}>
              <PhaseComponent 
                phase={task} 
                handleDelete={handleDeleteTask} 
                handleSave={handleSaveTask} 
                handleNewPhaseTask={handleNewPhaseTask} 
                index={idx}
              />
              {task.activities.map((a: Task, i: number) => 
                  <ItemComponent 
                    task={a} 
                    index={i}
                    handleSaveTask={handleSavePhaseTask} 
                    handleDeleteTask={() => handleDeletePhaseTask(idx, i)} 
                    hasPhase
                    readOnly={!(i === 0)}
                  />
                )
              } 
            </span>
            )
        }
      })} 
    </div>
      
  );
};
