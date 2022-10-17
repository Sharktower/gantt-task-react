import React, {useState} from "react";
import styles from '../task-list-items-edit.module.css'
import { Task } from "../../../types/public-types";

type TaskListItemsEditProps = {
    onSaveItem: () => void,
    tasks: Task[],
}

export const ItemsComponent = ({ tasks, onSaveItem } : TaskListItemsEditProps ) => {

    const [newItem, setNewItem] = useState(false)

    const [itemInputs, setItemInputs] = useState({
        type: undefined,
        name: undefined,
        workstream: undefined,
        startDate: undefined,
        endDate: undefined,
        owner: undefined 
    })

    const handleSaveItem = () => onSaveItem();
    const handleAddItem = () => setNewItem(true)
    const handleItemInput = (e: any) => {
        console.log(e)
        setItemInputs({...itemInputs, [e.target.name]: e.target.value})
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

    console.log(tasks)

    return (
        <div style={{ width: '100%'}}> 
            {!newItem && 
                <div style={{ width: '95%'}}> 
                    <button onClick={handleAddItem}>Add item</button>
                </div>
            }
            {/* IF TASKS THEN THEY BELONG TO A PHASE AND CREATE EMPTY */}
            {(tasks.length !== 0 || newItem) && 
                <div style={{ display: 'flex', width: '100%' }}>

                <table className={styles.taskListItemEditItemsWrapper} style={{width: '95%'}}>
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
                    <tbody>
                        <tr style={{ margin:'5px 0'}}>
                            <td><input type="text" onChange={handleItemInput} placeholder="Activity"/></td>
                            <td><input type="text" onChange={handleItemInput} placeholder="Enter an Activity Name" /></td> 
                            <td><input type="text" onChange={handleItemInput} placeholder="Workstream"/></td> 
                            <td><input type="date" onChange={handleItemInput} placeholder="Start Date"/></td> 
                            <td><input type="date" onChange={handleItemInput} placeholder="End Date"/></td> 
                                <td><input type="text" onChange={handleItemInput} placeholder="Add An Owner"/></td> 
                        <td style={{textAlign:'center'}}><button onClick={handleSaveItem} disabled={validateListItem()}>+</button></td> 
                        </tr>
                    {/* IF TASKS THEN THEY BELONG TO A PHASE LOOP THROIGH AND RENDER */}
                    {tasks.map((t: any) => {
                        return (
                            <tr>
                                <td><input type="text" placeholder="Activity" value={t.type}/></td>
                                <td><input type="text" placeholder="Enter an Activity Name" value={t.name}/></td> 
                                <td><input type="text" placeholder="Workstream" value={t.workstream}/></td> 
                                <td><input type="date" placeholder="Start Date" value={t.startDate}/></td> 
                                <td><input type="date" placeholder="End Date" value={t.endDate}/></td> 
                                <td><input type="text" placeholder="Add An Owner" value={t.owner}/></td> 
                                <td><button onClick={handleSaveItem}>+</button></td> 
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{ width: '5%'}}/>
        </div>
        }

    </div>
    )
}