import React from "react";
import './filters.css';
import {
    Button,
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export const Filters = ({searchUserHandler, options, setFilter, filter, data}) => {

    const inputs = document.getElementsByTagName('input');
    const cancelInputsHandler = () => {
        const h = Array.prototype.slice.call(inputs);
        h.forEach(element => element.checked = false);
        setFilter({...filter, age: null, role: [], gender: []});
    }

    const ageRanges = ['asc', 'desc'];

    return (
        <div className='filters'>
            <InputLabel className='filters__search-label'>
                Search a user
                <Input
                    placeholder='type a name...'
                    className='filters__search-input'
                    type='text'
                    onChange={(e) => searchUserHandler(e.target.value, data?.users)}/>
            </InputLabel>
            <Button
                startIcon={<ClearIcon/>}
                className='filters__clear-button'
                variant="contained"
                size='medium'
                type='button'
                onClick={(event) => {
                    if (event.target) {
                        cancelInputsHandler();
                    }
                }}>Clear filters</Button>
            <RadioGroup>
                {ageRanges.map(age =>
                    <FormControlLabel
                        key={age}
                        control={<Radio onChange={(event) => {
                            if (event.target.checked) {
                                setFilter({...filter, age: !filter.age});
                            }
                        }}/>}
                        label={age}
                        />
                )}
            </RadioGroup>
            <FormControl>
                {options.gender.map(gender => {
                    return (
                        <InputLabel key={gender}>
                            <Input
                                type='radio'
                                name='gender'
                                value={gender}
                                onChange={(event) => {
                                    let newGenderOptions = [];
                                    if (event.target?.checked) {
                                        newGenderOptions.push(gender);
                                    } else {
                                        newGenderOptions = newGenderOptions.filter(option => option !== gender)
                                    }
                                    setFilter({...filter, gender: newGenderOptions});
                                }}
                            />
                            {gender}
                        </InputLabel>
                    )
                })}
                <FormControl className='filter__select-role'>
                    <InputLabel id='user-editor__select-label'>Role</InputLabel>
                    <Select labelId='filter__select' label='Role' onChange={(event) => {
                        let newRoleOptions = [];
                        if (event.target) {
                            newRoleOptions.push(event.target.value);
                        } else {
                            newRoleOptions = newRoleOptions.filter(option => option !== event.target.value)
                        }
                        setFilter({...filter, role: newRoleOptions});
                    }}>
                        {options.role.map(role => {
                            return (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </FormControl>
        </div>
    )
}