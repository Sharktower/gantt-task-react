import React, {Fragment, useState} from "react";
import styles from '../task-list-items-edit.module.css'
import { Task } from "../../../types/public-types";

type TaskListItemsEditProps = {
    onSaveItem: (items:any) => void,
    task: Task,
    hasPhase: boolean,
    index: number
}

// type TaskType = 'project' | 'milestone' | 'outcome'

export const ItemComponent = ({ task, onSaveItem, index, hasPhase } : TaskListItemsEditProps ) => {

    const [isEditing, setIsEditing] = useState(false)
    const [itemInputs, setItemInputs] = useState({
        type: undefined,
        name: undefined,
        workstream: undefined,
        startDate: undefined,
        endDate: undefined,
        owner: undefined 
    })

    const handleSaveItem = () => {
        setIsEditing(false); 
        onSaveItem([]);
    }

    const handleItemInput = (e: any) => {
        setItemInputs({...itemInputs, [e.target.name]: e.target.value})
    }

    const getItemIcon = (type: string) => {
        console.log(type)
        return 'x'
    }
    const validateListItem = () => {
        return (
            itemInputs.type &&
            itemInputs.name && 
            itemInputs.workstream && 
            itemInputs.startDate &&
            itemInputs.endDate && 
            itemInputs.owner
        )
    }

    console.log(task)

    return (
        <Fragment> 
            <table className={styles.taskListItemEditItemsWrapper}>
                {/* ONLY RENDER IF I HAVE A PHASE AND I AM THE FIRST IN MAP */}
                {index === 0 && hasPhase && 
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
                        <td><input type="text" onChange={handleItemInput} name="type" placeholder="Activity"/></td>
                        <td><input type="text" onChange={handleItemInput} name="name" placeholder="Enter an Activity Name" /></td> 
                        <td><input type="text" onChange={handleItemInput} name="workstream" placeholder="Workstream"/></td> 
                        <td><input type="date" onChange={handleItemInput} name="startDate" placeholder="Start Date"/></td> 
                        <td><input type="date" onChange={handleItemInput} name="endDate" placeholder="End Date"/></td> 
                        <td><input type="text" onChange={handleItemInput} name="owner" placeholder="Add An Owner"/></td> 
                        <td style={{textAlign:'center'}}><button onClick={handleSaveItem} disabled={validateListItem()}>+</button></td> 
                    </tr>
                    }
                    {/* IF I AM NOT EDINTING THEN RENDER AS A BOX */}
                    {!isEditing && 
                        <tr style={{ margin:'5px 0'}}>
                            <td>{getItemIcon(task.type)}</td>
                            <td>{task.name}</td> 
                            <td>{task.name}</td> 
                            <td>{task.start && task.start.toString()}</td> 
                            <td>{task.end && task.end.toString()}</td> 
                            <td>{task.owner}</td> 
                            <td style={{textAlign:'center'}}><button style={{ visibility: 'hidden' }} onClick={() => setIsEditing(true)} disabled={validateListItem()}>PENCIL</button></td> 
                        </tr>
                    }
                </tbody>
            </table>
    </Fragment>
    )
}