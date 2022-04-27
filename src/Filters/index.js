import React from "react";
import './filters.css';

export const Filters = ({searchUserHandler, options, setFilter, filter, data}) => {

    console.log(filter)
    return (
        <div className='filters'>
            <label className='filters__search-label'>
                Search a user
                <input
                    placeholder='type a name...'
                    className='filters__search-input'
                    type='text'
                    onChange={(e) => searchUserHandler(e.target.value, data?.users)}/>
            </label>
            <div>
                {options.gender.map(gender => {
                    return (
                        <label key={gender}>
                            <input
                                type='radio'
                                name='gender'
                                value={gender}
                                onChange={(event) => {
                                    let newGenderOptions = [];
                                    if(event.target?.checked) {
                                        newGenderOptions.push(gender);
                                    } else {
                                        newGenderOptions = newGenderOptions.filter(option => option !== gender)
                                    }
                                    setFilter({...filter, gender: newGenderOptions});
                                }}
                            />
                            {gender}
                        </label>
                    )
                })}
                <select onChange={(event) => {
                    let newRoleOptions = [];
                    if(event.target) {
                        console.log(event.target)
                        newRoleOptions.push(event.target.value);
                    } else {
                        newRoleOptions = newRoleOptions.filter(option => option !== event.target.value)
                    }
                    setFilter({...filter, role: newRoleOptions});
                }}>
                    {options.role.map(role => {
                        return (
                            <option key={role} value={role}>{role}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}