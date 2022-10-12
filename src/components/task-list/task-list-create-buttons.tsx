import React from "react";

type TaskListCreateButtonsProps = {
    createPhase: () => void;
    createItem: () => void;
}

export const TaskListCreateButtons = ({createPhase, createItem} : TaskListCreateButtonsProps) => {

    const handleCreateNewPhase = () => createPhase();
    const handleCreateNewActivity = () => createItem();
    const handleCreateNewOutcome = () => createItem();

    return(
        <span style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }} >
            {/* Import the plus icon from ui components */}
            <button onClick={handleCreateNewPhase}>Add a phase</button>
            {/* Import the plus icon from ui components */}
            <button onClick={handleCreateNewActivity}>Add an Activity</button>
            {/* Import the plus icon from ui components */}
            <button onClick={handleCreateNewOutcome}>Add an outcome</button>
        </span>

    )
}
