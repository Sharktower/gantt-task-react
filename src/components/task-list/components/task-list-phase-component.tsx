import React, { useState } from "react";
import { Task } from "../../../types/public-types"
import styles from '../task-list-items-edit.module.css'

type PhaseComponetsProps = {
    phase: Task,
    handleSave: (idx: number, item: Task) => void,
    handleDelete: (idx: number) => void,
    handleNewPhaseTask: (idx: number) =>  void,
    index: number,
}

export const PhaseComponent = ({
  phase, 
  handleSave,
  handleDelete,
  handleNewPhaseTask,
  index
} : PhaseComponetsProps) => {

    const [isEditing, setIsEditing] = useState(!phase.start && !phase.end)
    const [thisPhase, setThisPhase] = useState(phase);

    const onSave = () => {
      handleSave(index, thisPhase)
      setIsEditing(false)
    }
   
    const handleTextInput = (e: any) => {
      setThisPhase({...thisPhase, [e.target.name]: e.target.value});
    }

    const handleDateInput = (e: any) => {
      setThisPhase({...thisPhase, [e.target.name]: new Date(e.target.value)});
    }

    const onDelete = () => handleDelete(index);
    const onIsEditing = () => setIsEditing(!isEditing);
    const onCreateItem = () => handleNewPhaseTask(index)

    return(
        <div style={{ display: "flex", width: "100%", marginTop: '10px'}} key={Math.random()}>
        {!isEditing &&
          <table className={styles.taskListItemEditPhaseWrapper}>
            <thead style={{height: '40px'}}>
              <tr>
                <th style={{ width: "50%", textAlign:'left' }}>Something</th>
                <th style={{ width: "20%", textAlign:'left', paddingLeft: "5px", }}>something</th>
                <th style={{ width: "20%", textAlign:'left', paddingLeft: "5px", }}>something</th>
                <th style={{ width: "5%", textAlign:'left', paddingLeft: "5px",}}><button onClick={onIsEditing}>Edit</button></th>
              </tr>
            </thead>
            {phase.activities.length === 0 && <button onClick={onCreateItem}>Add Item</button>}
          </table>
        }

        {isEditing && 
            <table  style={{
                backgroundColor: "#F7F7F7",
                width: "95%",
                padding: "10px",
                }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "left", paddingLeft: "5px", width: "50%" }}>Phase Name</th>
                  <th style={{ textAlign: "left", paddingLeft: "5px", width: "20%" }}>Start</th>
                  <th style={{ textAlign: "left", paddingLeft: "5px", width: "20%" }}>End</th>
                  <th style={{ textAlign: "left", paddingLeft: "5px", width: "5%" }}>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td style={{ paddingLeft: "5px" }}>
                    <input
                      name="name"
                      type="text"
                      value={thisPhase.name}
                      onChange={handleTextInput}
                      style={{
                        width: "100%",
                        border: "1px solid #E1E1E1",
                        minHeight: "30px",
                        borderRadius: "4px"
                      }}
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      style={{
                        width: "100%",
                        border: "1px solid #E1E1E1",
                        minHeight: "30px",
                        borderRadius: "4px"
                      }}
                      placeholder="Enter a Phase name"
                      type="date"
                      name="start"
                      value={thisPhase.start?.toISOString().split('T')[0]}
                      onChange={handleDateInput}
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      name="end"
                      onChange={handleDateInput}
                      value={thisPhase.end?.toISOString().split('T')[0]}
                      style={{
                        width: "100%",
                        border: "1px solid #E1E1E1",
                        minHeight: "30px",
                        borderRadius: "4px"
                      }}
                      placeholder="Enter a Phase name"
                      type="date"
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <button
                      style={{ backgroundColor: "gray", color: "white" }}
                      onClick={() => onSave()}
                      disabled={!thisPhase.start && !thisPhase.end}
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>}
          <span style={{ display: "flex", alignItems: "center", justifyContent: 'center', width: "5%" }}>
            <button style={{ height: "fit-content" }} onClick={() => onDelete()}>
                x
            </button>
          </span>
      </div>
    )
};
