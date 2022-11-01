import React, { Fragment, useState } from "react";
import styles from "./task-list-render-tasks.module.css";
import { Task, TaskType } from "../../types/public-types";
import { TaskListEdit } from "./task-list-edit";
import { TaskListEmpty } from  "./task-list-empty"
import { TaskListRenderTasks } from "./task-list-render-tasks";
import { TaskListCreateButtons } from "./task-list-create-buttons"

const OUTCOME : Task = {
  id: '',
  type: "milestone",
  name: '',
  start: undefined,
  end: undefined,
  progress: 0,
  activities: [],
}

const ACTIVITY : Task = {
  id: '',
  type: "task",
  name: '',
  start: undefined,
  end: undefined,
  progress: 0,
  activities: [],
}

const PROJECT : Task = {
  id: '',
  type: 'project',
  name: '',
  start: undefined,
  end: undefined,
  progress: 0,
  activities: [],
}

const NEW_TASK : Task = {
  id: '',
  type: '',
  name: '',
  start: undefined,
  end: undefined,
  progress: 0,
  activities: [],
}

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

  // ON LOAD, SET THE TAGS TO RENDER IN CASE WE NEED TO ADD MORE
  const [tasksToRender, setTasksToRender] = useState(tasks)

  // ON CREATE NEW SELECTION, ADD EMPTY OPBJECT OF THAT TYPE
  const handleCreateTask = (type: TaskType) => {
    let newTaskToRender = tasksToRender;
    if(type === 'project') newTaskToRender.unshift(PROJECT);
    if(type === 'milestone') newTaskToRender.push(OUTCOME);
    if(type === 'task') newTaskToRender.push(ACTIVITY);    

    setTasksToRender(newTaskToRender)
    // THIS IS FOR EMPTY GANTT
    if(!isEditing) handleOnIsEditing();
  }

  const updateTaskList = (newTasks: Task[] ) => {
    setTasksToRender(newTasks);
    if(newTasks.length === 0) handleOnIsEditing();
  }

  const handleDeleteTask = (idx : number) => {
    const newTasks = tasksToRender.slice(idx, 0);
    updateTaskList(newTasks);
  }

  const handleSaveTask = (idx: number, item: Task) => {
    const newTasks = tasksToRender;
    newTasks[idx] = item;
    updateTaskList(newTasks);
  }

  const handleNewPhaseTask = (idx: number) => {
    const newTasks = tasksToRender;
    newTasks[idx].activities.push(NEW_TASK);
    setTasksToRender(newTasks);
  }

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
        width: "100%",
      }}
    >
      {/* NO TASKS, RENDER EMPTY GANTT*/}
      {!isEditing && tasksToRender.length === 0 && <TaskListEmpty handleCreateTask={handleCreateTask}/>}

      {/* IS TASKS - RENDER BUT NOT EDITING */}
      {!isEditing && tasksToRender.length !== 0 &&  <TaskListRenderTasks tasks={tasksToRender} onExpanderClick={onExpanderClick}/>}
      
      {/*EDITING - CREATE TASKS*/}
      {isEditing && 
        <Fragment>
          <TaskListEdit 
            tasks={tasksToRender} 
            onIsEditing={handleOnIsEditing} 
            handleNewPhaseTask={handleNewPhaseTask}
            handleSaveTask={handleSaveTask}
            handleDeleteTask={handleDeleteTask}
          />
          <TaskListCreateButtons handleSelection={handleCreateTask}/>
        </Fragment>
      } 
        
    </div>
  );
};
