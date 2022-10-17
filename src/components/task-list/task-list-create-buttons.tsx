import React from "react";

type TaskListCreateButtonsProps = {
    handleSelection: any;
}

export const TaskListCreateButtons = ({handleSelection} : TaskListCreateButtonsProps) => {

    const onSelection = (e:any) => {
        console.log(e)
        handleSelection(e.target.name)
    }

    return(
        <span style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px", width:'95%' }} >
            {/* Import the plus icon from ui components */}
            <button onClick={onSelection} name="project">Add a phase</button>
            {/* Import the plus icon from ui components */}
            <button onClick={onSelection} name="task">Add an Activity</button>
            {/* Import the plus icon from ui components */}
            <button onClick={onSelection} name="milestone">Add an outcome</button>
        </span>
    )
}
