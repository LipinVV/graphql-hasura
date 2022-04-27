import React from "react";


export const RadioButton = ({option, setUserOption, userOption}) => {

    return (
        <label className='user-editor__label' key={option}>
            <input
                className='user-editor__input'
                value={option}
                onChange={(event) => setUserOption(event.target.value)}
                checked={option === userOption}
                type="radio"/>
            {option}
        </label>
    )
}