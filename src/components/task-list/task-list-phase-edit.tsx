import React, { useState } from "react";
import { TaskListCreateButtons } from "./task-list-create-buttons";
import { TaskListItemsEdit } from "./task-list-items-edit"
import { Task } from "../../types/public-types";


interface Phase {
    name?: string;
    startDate?: Date;
    endDate?: Date;
}

type TaskListInputPhaseProps = {
    createPhase: () => void,
    createItem: () => void,
    savePhase: () => void,
    removePhase: () => void,
    saveItem: () => void,
    tasks: Task[]
    isNewPhase: boolean,
}

export const TaskListPhaseEdit = ({createPhase, createItem, savePhase, removePhase, tasks, saveItem, isNewPhase} : TaskListInputPhaseProps ) => {

  const [newPhaseMeta, setNewPhaseMeta] = useState<Phase>({
    name: "",
    startDate: undefined,
    endDate: undefined,
  });

  const handlePhaseSave = () => savePhase();
  const handleRemovePhase = () => removePhase();
  const validatePhaseComplete = () => !(newPhaseMeta.startDate && newPhaseMeta.endDate)
  const handlePhaseInput = (e: any) =>  setNewPhaseMeta({ ...newPhaseMeta, ...{[e.target.name]: e.target.value} });

  return (
    <div style={{padding: '10px'}}>
    {isNewPhase && <div style={{ padding: "10px"}}>
        <div style={{ display: "flex" }}>
        <table
          style={{
            backgroundColor: "#F7F7F7",
            width: "100%",
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
              <td>
                <input
                  type="text"
                  name="text2"
                  defaultValue=""
                  autoComplete="off"
                />
              </td>
              <td style={{ padding: "5px" }}>
                <input
                  style={{
                    width: "100%",
                    border: "1pz solid #E1E1E1",
                    minHeight: "30px",
                  }}
                  placeholder="Enter a Phase name"
                  type="date"
                  name="startDate"
                  onChange={handlePhaseInput}
                />
              </td>
              <td style={{ padding: "5px" }}>
                <input
                  name="endDate"
                  onChange={handlePhaseInput}
                  style={{
                    width: "100%",
                    border: "1pz solid #E1E1E1",
                    minHeight: "30px",
                  }}
                  placeholder="Enter a Phase name"
                  type="date"
                />
              </td>
              <td style={{ padding: "5px" }}>&nbsp;</td>
              <td style={{ padding: "5px" }}>
                <button
                  style={{ backgroundColor: "gray", color: "white" }}
                  onClick={handlePhaseSave}
                  disabled={validatePhaseComplete()}
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <span style={{ display: "flex", alignItems: "center", margin: "0 1%" }}>
          <button style={{ height: "fit-content" }} onClick={handleRemovePhase}>
            x
          </button>
        </span>
      </div>
      <TaskListCreateButtons createPhase={createPhase} createItem={createItem} />
    </div>
    }

    {!isNewPhase && <div>
        <TaskListItemsEdit tasks={tasks} saveItem={saveItem} phase={{name: 'Something1', startDate:'2023-10-01', endDate:'2023-10-30'}}/>
      </div>
    }
       
    </div>
  );
};
