import React from "react";

type Props = {
    handleInput: (event: any) => void;
    name: string;
}

export const ItemComponent = ({ handleInput, name } : Props) => {

    const onChange = (e: any) => handleInput(e)
    
    return (
        <input name={name} onChange={onChange} />
    )

}