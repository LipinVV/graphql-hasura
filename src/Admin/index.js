import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {INSERT_USER} from "../graphql/mutations";
import {GET_USERS_QUERY} from "../graphql/queries";
import './admin.css';

export const Admin = ({editUser, id}) => {
    const genders = ['Male', 'Female'];
    const userAgeDefaultValue = 18;

    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState(userAgeDefaultValue);
    const [userGender, setUserGender] = useState(genders[0]);

    const [insertUser, {error}] = useMutation(INSERT_USER);
    const insertUserHandler = async () => {
        await insertUser({
            variables: {
                username: userName,
                age: userAge,
                gender: !userGender
            },
            refetchQueries: [{query: GET_USERS_QUERY}]
        })
        if (error) {
            console.error(error)
        }
    }

    return (
        <div className='admin'>
            username<input placeholder='user' type='text' value={userName} onChange={(event) => setUserName(event.target.value)}/>
            age<input placeholder='18' type='number' value={userAge} onChange={(event) => setUserAge(Number(event.target.value))}/>
            {genders.map(gender =>
                <label key={gender}>
                    <input
                        value={gender}
                        onChange={(event) => setUserGender(event.target.value)}
                        checked={gender === userGender}
                        type="radio"/>
                    {gender}
                </label>
            )}
            <button type='button' onClick={() => {
                void insertUserHandler();
                editUser(id);
            }}>submit</button>
            <button type='button' onClick={() => {
                editUser(id);
            }}>cancel</button>
        </div>
    )
}