import React from "react";
import {Radio, RadioGroup} from "@mui/material";


export const RadioButton = ({option, setUserOption, userOption}) => {

    return (
        <RadioGroup className='user-editor__label' key={option}>
            <Radio
                key={option}
                className='user-editor__input'
                value={option}
                onChange={(event) => setUserOption(event.target.value)}
                checked={option === userOption}
                name='option'
                type="radio"/>
            {option}
        </RadioGroup>
    )
}