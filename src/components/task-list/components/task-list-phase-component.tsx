import React, {useState, useEffect } from "react";
import styles from '../task-list-items-edit.module.css'

interface Phase {
    name?: string;
    startDate?: Date;
    endDate?: Date;
}

type PhaseComponetsProps = {
    phase: Phase,
    onSavePhase: ({...Phase}) => void,
    onDeletePhase: () => void,
    index: number | undefined,
}

const validatePhaseComplete = (phase: any) => !(phase.startDate && phase.endDate);

export const PhaseComponent = ({phase, onSavePhase, onDeletePhase} : PhaseComponetsProps) => {

    useEffect(() => {
      if(!validatePhaseComplete(phase)){
        setIsEditing(true)}
      },
      [phase]
    )


    const [isEditing, setIsEditing] = useState(false)

    const handleDelete = () => onDeletePhase();
    const handleIsEditing = () => setIsEditing(!isEditing);
    const handleInput = (e: any) =>  onSavePhase({[e.target.name]: e.target.value});
    const handleOnSave = (e: any) => {onSavePhase(e); setIsEditing(!isEditing) }

    return(
        <div style={{ display: "flex", width: "100%" }}>
        {!isEditing && 
            <table className={styles.taskListItemEditPhaseWrapper}>
                <thead style={{height: '40px'}}>
                    <tr>
                        <th style={{ width: "50%", textAlign:'left' }}>Something</th>
                        <th style={{ width: "20%", textAlign:'left' }}>something</th>
                        <th style={{ width: "20%", textAlign:'left' }}>something</th>
                        <th style={{ width: "10%", textAlign:'left' }}><button onClick={handleIsEditing}>Edit</button></th>
                    </tr>
                </thead>
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
                      name="startDate"
                      onChange={handleInput}
                    />
                  </td>
                  <td style={{ padding: "5px" }}>
                    <input
                      name="endDate"
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
                      onClick={handleOnSave}
                      disabled={validatePhaseComplete(phase)}
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>}
          <span style={{ display: "flex", alignItems: "center", justifyContent: 'center', width: "5%" }}>
            <button style={{ height: "fit-content" }} onClick={handleDelete}>
                x
          </button>
          </span>
      </div>
    )
};
