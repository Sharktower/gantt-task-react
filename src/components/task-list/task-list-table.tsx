import React, { Fragment, useEffect } from "react";
import styles from "./task-list-render-tasks.module.css";
import { Task } from "../../types/public-types";
import { TaskListEdit } from "./task-list-edit";
import { TaskListEmpty } from  "./task-list-empty"
import { TaskListRenderTasks } from "./task-list-render-tasks";
import { TaskListCreateButtons } from "./task-list-create-buttons"

type itemTypes = 'project' | 'milestone' | 'task' | '';

export const TaskListTableDefault: React.FC<{
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  isEditing: boolean;
  handleOnIsEditing: () => void;
}> = ({
  tasks,
  fontFamily,
  fontSize,
  onExpanderClick,
  isEditing,
  handleOnIsEditing,
}) => {

  let newTasks: any = [];

  useEffect(() => {
    newTasks = tasks;
  }, [tasks])

  const OUTCOME = {
    id: '',
    type: "milestone",
    name: '',
    start: undefined,
    end: undefined,
    progress: 0,
    activities: [],
  }

  const ACTIVITY = {
    id: '',
    type: "task",
    name: '',
    start: undefined,
    end: undefined,
    progress: 0,
    activities: [],
  }

  const PROJECT = {
    id: '',
    type: "project",
    name: '',
    start: undefined,
    end: undefined,
    progress: 0,
    activities: [],
  }

 
  const handleTypeSelection = (type: itemTypes) => {

    if(type === 'project'){
      newTasks.unshift(PROJECT)
      console.log(isEditing, newTasks)
    }
    if(type === 'milestone'){
      newTasks.push(OUTCOME)
    }
    if(type === 'task'){
      newTasks.push(ACTIVITY)
    }
    if(!isEditing){
      handleOnIsEditing();
    }
  }

  console.log(isEditing, newTasks)

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
        width: "100%",
      }}
    >
      {/* NO TASK */}
      {!isEditing && newTasks.length === 0 && <TaskListEmpty onTypeSelection={handleTypeSelection}/>}

      {/* RENDER TASK ITEMS */}
      {!isEditing && newTasks.length !== 0 &&  <TaskListRenderTasks tasks={newTasks} onExpanderClick={onExpanderClick}/>}
      
      {/* CREATE NEW PHASE*/}
      {isEditing && 
        <Fragment>
          <TaskListEdit tasks={newTasks} onIsEditing={handleOnIsEditing}/>
          <TaskListCreateButtons handleSelection={handleTypeSelection}/>
        </Fragment>
      } 
        
    </div>
  );
};
