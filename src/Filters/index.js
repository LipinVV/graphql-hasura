import React, {useEffect, useState} from "react";


export const Filters = ({users}) => {

    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users])

    const options = {
        gender: ['Male', 'Female'],
    }



    return (
        <div className='filters'>
            {options.gender.map(gender => {
                return (
                    <label>
                        <input type='radio' value={gender}  />{gender}
                    </label>
                )
            })}
        </div>
    )
}