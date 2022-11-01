import React from "react";
import { TaskType } from "../../types/public-types";
import {TaskListCreateButtons} from './task-list-create-buttons'
import styles from "./task-list-empty.module.css";


type TaskListEmptyProps = {
    handleCreateTask: (type: TaskType) => void;
}

export const TaskListEmpty = ({handleCreateTask} : TaskListEmptyProps) => {
    
    return(
        <div className={styles.taskListEmptyWrapper}>
            <span>
                <div style={{ padding: "50px" }}>
                    <span style={{ display: "flex", justifyContent: "center" }}>
                        <div className={styles.taskListEmptyCircle}/>
                    </span>
                    <strong>
                        <h5 style={{ fontSize: "18px" }}>No Items</h5>
                    </strong>
                    <p style={{ fontSize: "13px", padding: "0 20% 10% 20%" }}>
                        Your gantt plan is currenlty empty. Start by adding a phase, activity or outcome below
                    </p>
                </div>
                <TaskListCreateButtons handleSelection={handleCreateTask}/>
            </span>
      </div>
    )
}