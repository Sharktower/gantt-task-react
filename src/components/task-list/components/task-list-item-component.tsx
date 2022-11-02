import React, {Fragment, useState, useRef} from "react";
import styles from '../task-list-items-edit.module.css'
import { Task } from "../../../types/public-types";

type TaskListItemsEditProps = {
    handleSaveTask: (index: number, item: Task) => void,
    handleDeleteTask: () => void,
    task: any,
    hasPhase: boolean,
    index: number
    readOnly: boolean,
    headerOverride?: boolean,
}

const UNDEFINED = {
    type: '',
    name: '',
    start: undefined,
    end: undefined,
    activities: [],
    owner: '',
  }


export const ItemComponent = ({ task, handleSaveTask, handleDeleteTask, index, readOnly, headerOverride, hasPhase } : TaskListItemsEditProps ) => {

    const [isEditing, setIsEditing] = useState(true)
    const [thisItem, setThisItem] = useState(task)

    const typeRef = useRef(null)
    // const nameRef = useRef(null)
    // const workStreamRef = useRef(null)
    // const startRef = useRef(null)
    // const endRef = useRef(null)
    // const ownerRef = useRef(null)

    const onDelete = () => handleDeleteTask();
 
    const onSave = () => {
        handleSaveTask(index, thisItem)
        setThisItem(UNDEFINED)
    }

    const onIsEditing = () => setIsEditing(!isEditing);

    console.log("RENDERINg?", typeRef)

    const handleInput = (e: any) => {
    
        e.preventDefault()
        const tmpItem = {[e.target.name]: e.target.value}
        setThisItem({...thisItem, ...tmpItem})
    }
    
    const getItemIcon = () => 'x'

    const validateTask = () => {
        if(
            // thisItem.type && 
            // thisItem.name &&
            thisItem.start && 
            thisItem.end
            // thisItem.owner
        ) return false;

        return true;
    }

    return (
        <Fragment>
        <div style={{ display: 'flex', marginTop: `${hasPhase ? '0px' : '10px' }`}} key={Math.random()}> 
            <table className={styles.taskListItemEditItemsWrapper} style={{ width: '95%'}}>
                {/* ONLY RENDER IF I HAVE A PHASE AND I AM THE FIRST IN MAP */}
                {(index === 0 || headerOverride) && 
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
                    {isEditing && !readOnly &&
                    <tr style={{ margin:'5px 0'}}>
                        <td><input type="text" onChange={handleInput} name="type" placeholder="Activity" autoComplete="off" defaultValue={thisItem.type}/></td>
                        <td><input type="text" value={thisItem.name} onChange={handleInput} name="name" placeholder="Enter an Activity Name" /></td> 
                        <td><input type="text" value={thisItem.workstream} onChange={handleInput} name="workstream" placeholder="Workstream"/></td> 
                        <td><input type="date" onChange={handleInput} name="start" placeholder="Start Date"/></td> 
                        <td><input type="date" onChange={handleInput} name="end" placeholder="End Date"/></td> 
                        <td><input type="text" value={thisItem.owner} onChange={handleInput} name="owner" placeholder="Add An Owner"/></td> 
                        <td style={{textAlign:'center'}}><button onClick={onSave} disabled={validateTask()}>+</button></td> 
                    </tr>
                    }
                    {/* IF I AM NOT EDINTING THEN RENDER AS A BOX */}
                    {!isEditing && readOnly &&
                        <tr style={{ margin:'5px 0'}}>
                            <td>{getItemIcon()}</td>
                            <td>{task.type}</td> 
                            <td>{task.name}</td> 
                            <td>{task.start && task.start.toString()}</td> 
                            <td>{task.end && task.end.toString()}</td> 
                            <td>{task.owner}</td> 
                            <td style={{textAlign:'center'}}><button style={{ visibility: 'hidden' }} onClick={() => onIsEditing()}>PENCIL</button></td> 
                        </tr>
                    }
                </tbody>
            </table>
            <span style={{ display: "flex", alignItems: "center", justifyContent: 'center', width: "5%" }}>
            <button style={{ height: "fit-content" }} onClick={onDelete}>
                x
            </button>
          </span>
    </div>
    </Fragment>
    )
}