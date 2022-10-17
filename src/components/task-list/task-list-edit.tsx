import React, {Fragment} from "react";
import { ItemComponent } from "./components/task-list-item-component";
import { Task } from "../../types/public-types";
import { PhaseComponent } from './components/task-list-phase-component'


type TaskListInputPhaseProps = {
    tasks: Task[],
    onIsEditing: () => void,
}

export const TaskListEdit = ({ tasks } : TaskListInputPhaseProps ) => {

  const handleSaveItem = (items: any) => console.log(items)
  const handleSavePhase = (phase: any) => console.log(phase)

  const deletePhase = () => {console.log("mehh")};


  console.log(tasks)

  return (
    <div style={{padding: '10px'}}>      
      {tasks.map( (task: Task, idx: number) => {
        // IF IAM NOT A PROJECT I AM AN ORPHAN
        if(task.type !== 'project') {
          return <ItemComponent task={task} onSaveItem={handleSaveItem} index={idx} hasPhase={false}/>
        }
        // I MUST BE A PROJECT HERE.
        return( 
          <Fragment>
              <PhaseComponent phase={task} onDeletePhase={deletePhase} onSavePhase={handleSavePhase} index={idx} />
              {task.activities.map((a: Task, i: number) => {
                return (
                  <ItemComponent 
                    task={a} 
                    onSaveItem={handleSaveItem}
                    index={i}
                    hasPhase={true}
                />
                )
              })}
          </Fragment>
          )
      })} 
    </div>
      
  );
};
