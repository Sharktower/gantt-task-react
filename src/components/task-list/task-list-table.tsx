import React, { useState } from "react";
import styles from "./task-list-render-tasks.module.css";
import { Task } from "../../types/public-types";
import { TaskListPhaseEdit } from "./task-list-phase-edit";
import {TaskListEmpty} from  "./task-list-empty"
import { TaskListRenderTasks } from "./task-list-render-tasks";

// const localeDateStringCache = {};
// const toLocaleDateStringFactory =
//   (locale: string) =>
//   (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
//     const key = date.toString();
//     let lds = localeDateStringCache[key];
//     if (!lds) {
//       lds = date.toLocaleDateString(locale, dateTimeOptions);
//       localeDateStringCache[key] = lds;
//     }
//     return lds;
//   };
// const dateTimeOptions: Intl.DateTimeFormatOptions = {
//   weekday: "short",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };



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

  const [isNewPhase, setIsNewPhase] = useState(false);

  const removeNewPhase = () => {
    if (isEditing && !tasks.length) {
      handleOnIsEditing();
    } else {
      setIsNewPhase(false);
    }
  };

  const createNewPhase = () => {
    setIsNewPhase(true);
  };

  const createNewItem = () => {
    console.log('creating a new phase')
  }

  const saveNewItem = () => {
    console.log('saving new item')
  }

  const saveNewPhase = () => {
    setIsNewPhase(false);
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
   

      {/* NO TASK */}
      {tasks.length === 0 && !isEditing && <TaskListEmpty createPhase={createNewPhase} createItem={createNewItem} handleOnIsEditing={handleOnIsEditing}/>}
      {/* CREATE NEW PHASE*/}
      {isEditing && <TaskListPhaseEdit createPhase={createNewPhase} createItem={createNewItem} savePhase={saveNewPhase} removePhase={removeNewPhase} tasks={tasks} saveItem={saveNewItem} isNewPhase={isNewPhase}/>}
      {/* RENDER TASK ITEMS */}
      {tasks.length !== 0 && !isEditing && <TaskListRenderTasks tasks={tasks} onExpanderClick={onExpanderClick}/>}
     
    </div>
  );
};
