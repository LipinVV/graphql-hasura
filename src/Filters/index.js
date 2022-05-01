import React, {useState} from "react";
import './filters.css';
import {
    Button,
    FormControl,
    FormControlLabel, Grid,
    Input,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export const Filters = ({searchUserHandler, options, setFilter, filter, data}) => {

    const inputs = document.getElementsByTagName('input');
    const cancelInputsHandler = () => {
        const convertedArrayFromCollection = Array.prototype.slice.call(inputs);
        convertedArrayFromCollection.forEach(element => element.checked = false);
        const searchInput = document.getElementById('search-input');
        searchInput.value = '';
        setFilter({...filter, age: [], role: [], gender: []});
    }

    const [role, setRole] = useState('');
    const roleHandleChange = () => {
        setRole('');
    };

    return (
        <Grid
            justifyContent='space-around'
            container
            spacing={{xs: 1}}
            className='filters'
        >
            <Grid
                className='filters__filter'
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <InputLabel
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    className='filters__search-label'
                >
                    <PersonSearchIcon/>
                    <Input
                        sx={{color: 'white'}}
                        id='search-input'
                        placeholder='type a name...'
                        className='filters__search-input'
                        type='text'
                        onChange={(e) => searchUserHandler(e.target.value, data?.users)}
                    />
                </InputLabel>
            </Grid>
            <Grid className='filters__filter' item>
                <FormControl>
                    <RadioGroup>
                        {options.age.map(age =>
                            <FormControlLabel
                                sx={{color: 'white'}}
                                key={age}
                                value={age}
                                control={<Radio
                                    sx={{
                                        color: 'white',
                                        '&.Mui-checked': {
                                            color: 'white',
                                        },
                                    }}
                                    type='radio'
                                    value={age}
                                    checked={age === filter.age[0]}
                                    onChange={(event) => {
                                        let newAgeOptions = [];
                                        if (event.target?.checked) {
                                            newAgeOptions.push(age);
                                        } else {
                                            newAgeOptions = newAgeOptions.filter(option => option !== age)
                                        }
                                        setFilter({...filter, age: newAgeOptions});
                                    }}/>}
                                label={age}>
                                {age}
                            </FormControlLabel>
                        )}
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid className='filters__filter' item>
                <FormControl>
                    <RadioGroup>
                        {options.gender.map(gender => {
                            return (
                                <FormControlLabel
                                    value={gender}
                                    key={gender}
                                    sx={{color: 'white'}}
                                    control={<Radio
                                        sx={{
                                            color: 'white',
                                            '&.Mui-checked': {
                                                color: 'white',
                                            },
                                        }}
                                        type='radio'
                                        value={gender}
                                        checked={gender === filter.gender[0]}
                                        onChange={(event) => {
                                            let newGenderOptions = [];
                                            if (event.target?.checked) {
                                                newGenderOptions.push(gender);
                                            } else {
                                                newGenderOptions = newGenderOptions.filter(option => option !== gender)
                                            }
                                            setFilter({...filter, gender: newGenderOptions});
                                        }}/>
                                    } label={gender}>{gender}
                                </FormControlLabel>
                            )
                        })}
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid className='filters__filter' item>
                <FormControl className='filter__select-role'>
                    <InputLabel id='user-editor__select-label'>Role</InputLabel>
                    <Select
                        className='filter__select'
                        labelId='filter__select'
                        label='Role'
                        value={role}
                        onChange={(event) => {
                            setRole(event.target.value);
                            let newRoleOptions = [];
                            if (event.target) {
                                newRoleOptions.push(event.target.value);
                            } else {
                                newRoleOptions = newRoleOptions.filter(option => option !== event.target.value)
                            }
                            setFilter({...filter, role: newRoleOptions});
                        }}>
                        <MenuItem disabled={true}>Role</MenuItem>
                        {options.role.map(role => {
                            return (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid className='filters__filter'
                  item
                // sm={2}
                  md={3}
                  lg={3}
            >
                <Button
                    startIcon={<ClearIcon/>}
                    className='filters__clear-button'
                    variant="clear"
                    type='button'
                    onClick={(event) => {
                        if (event.target) {
                            cancelInputsHandler();
                            roleHandleChange();
                            searchUserHandler('', data?.users);
                        }
                    }}>no filters
                </Button>
            </Grid>
        </Grid>
    )
}