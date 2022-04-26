import React from "react";
import './filters.css';

export const Filters = ({searchUserHandler, options, setFilter, filter, data}) => {


    return (
        <div className='filters'>
            <label className='filters__search-label'>
                Search a user
                <input
                    placeholder='type a product...'
                    className='filters__search-input'
                    type='text'
                    onChange={(e) => searchUserHandler(e.target.value, data?.users)}/>
            </label>
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
        </div>
    )
}