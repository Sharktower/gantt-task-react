import React, {Fragment, useState} from "react";
import styles from '../task-list-items-edit.module.css'
import { Task } from "../../../types/public-types";

type TaskListItemsEditProps = {
    handleSaveTask: (index: number, item: Task) => void,
    handleDeleteTask: (index: number, phaseTaskIndex?: number) => void,
    task: Task,
    hasPhase: boolean,
    index: number
}

const UNDEFINED : Task = {
    id: '',
    type: '',
    name: '',
    start: undefined,
    end: undefined,
    progress: 0,
    activities: [],
    owner: '',
  }


export const ItemComponent = ({ task, handleSaveTask, handleDeleteTask, index } : TaskListItemsEditProps ) => {

    const [isEditing, setIsEditing] = useState(true)
    const [thisItem, setThisItem] = useState(UNDEFINED)

    const onDelete = () => handleDeleteTask(index);
 
    const onSave = () => handleSaveTask(index, thisItem)

    const onIsEditing = () => setIsEditing(!isEditing);

    const handleInput = (e: any) => {
      const tmpItem = {[e.target.name]: e.target.value}
      setThisItem({...thisItem, ...tmpItem})
    }
    
    const getItemIcon = () => 'x'

    return (
        <Fragment> 
            <table className={styles.taskListItemEditItemsWrapper} style={{ width: '95%'}}>
                {/* ONLY RENDER IF I HAVE A PHASE AND I AM THE FIRST IN MAP */}
                {index === 0 && 
                    <thead>
                        <tr>
                            <th style={{ width: "10%"}}>Type</th>
                            <th style={{ width: "25%"}}>Name</th>
                            <th style={{ width: "15%"}}>Workstream</th>
                            <th style={{ width: "10%"}}>Start</th>
                            <th style={{ width: "10%"}}>End</th>
                            <th style={{ width: "25%" }}>Owner</th>
                            <th style={{ width: "5%" }}>&nbsp;</th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {/* IF I AM EDITING THEM SHOW WITH INPUTS */}
                    {isEditing && 
                    <tr style={{ margin:'5px 0'}}>
                        <td><input type="text" onChange={handleInput} name="type" placeholder="Activity"/></td>
                        <td><input type="text" onChange={handleInput} name="name" placeholder="Enter an Activity Name" /></td> 
                        <td><input type="text" onChange={handleInput} name="workstream" placeholder="Workstream"/></td> 
                        <td><input type="date" onChange={handleInput} name="startDate" placeholder="Start Date"/></td> 
                        <td><input type="date" onChange={handleInput} name="endDate" placeholder="End Date"/></td> 
                        <td><input type="text" onChange={handleInput} name="owner" placeholder="Add An Owner"/></td> 
                        <td style={{textAlign:'center'}}><button onClick={onSave}>+</button></td> 
                    </tr>
                    }
                    {/* IF I AM NOT EDINTING THEN RENDER AS A BOX */}
                    {!isEditing && 
                        <tr style={{ margin:'5px 0'}}>
                            <td>{getItemIcon()}</td>
                            <td>{task.type}</td> 
                            <td>{task.name}</td> 
                            <td>{task.start && task.start.toString()}</td> 
                            <td>{task.end && task.end.toString()}</td> 
                            <td>{task.owner}</td> 
                            <td style={{textAlign:'center'}}><button style={{ visibility: 'hidden' }} onClick={onIsEditing}>PENCIL</button></td> 
                        </tr>
                    }
                </tbody>
            </table>
            <span style={{ display: "flex", alignItems: "center", justifyContent: 'center', width: "5%" }}>
            <button style={{ height: "fit-content" }} onClick={onDelete}>
                x
            </button>
          </span>
    </Fragment>
    )
}