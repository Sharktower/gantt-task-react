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

    const onDelete = () => handleDelete(index);
    const onIsEditing = () => setIsEditing(!isEditing);
    const onCreateItem = () => handleNewPhaseTask(index)
    const onSave = () => {
      handleSave(index, thisPhase)
      setIsEditing(false)
    }
   
    const handleInput = (e: any) => {
      const tmpItem = {[e.target.name]: e.target.value}
      setThisPhase({...thisPhase, ...tmpItem})
    }

    return(
        <div style={{ display: "flex", width: "100%" }}>
        {!isEditing &&
          <table className={styles.taskListItemEditPhaseWrapper}>
            <thead style={{height: '40px'}}>
              <tr>
                <th style={{ width: "50%", textAlign:'left' }}>Something</th>
                <th style={{ width: "20%", textAlign:'left' }}>something</th>
                <th style={{ width: "20%", textAlign:'left' }}>something</th>
                <th style={{ width: "10%", textAlign:'left' }}><button onClick={onIsEditing}>Edit</button></th>
              </tr>
            </thead>
            <button onClick={onCreateItem}>Add Item</button>
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
                  <th style={{ textAlign: "left", padding: "5px", width: "60%" }}>Phase Name</th>
                  <th style={{ textAlign: "left", padding: "5px", width: "10%" }}>Start</th>
                  <th style={{ textAlign: "left", padding: "5px", width: "10%" }}>End</th>
                  <th style={{ textAlign: "left", padding: "5px", width: "10%" }}>&nbsp;</th>
                  <th style={{ textAlign: "left", padding: "5px", width: "10%" }}>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <td style={{ padding: "5px" }}>
                    <input
                      type="text"
                      name="text2"
                      defaultValue=""
                      autoComplete="off"
                      style={{
                        width: "98%",
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
                      onChange={handleInput}
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      name="end"
                      onChange={handleInput}
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
                  <td style={{ padding: "5px" }}>&nbsp;</td>
                  <td style={{ padding: "5px" }}>
                    <button
                      style={{ backgroundColor: "gray", color: "white" }}
                      onClick={onSave}
                      disabled={!thisPhase.start && !thisPhase.end}
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>}
          <span style={{ display: "flex", alignItems: "center", justifyContent: 'center', width: "5%" }}>
            <button style={{ height: "fit-content" }} onClick={onDelete}>
                x
            </button>
          </span>
      </div>
    )
};
