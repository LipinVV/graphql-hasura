import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {GET_USERS_QUERY} from "../../graphql/queries";
import {UPDATE_USER} from "../../graphql/mutations";
import './userEditor.css';

export const UserEditor = ({editUser, id}) => {
    const genders = ['Male', 'Female'];
    const userAgeDefaultValue = 18;

    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState(userAgeDefaultValue);
    const [userGender, setUserGender] = useState(genders[0]);


    const [updateUser, {error}] = useMutation(UPDATE_USER);
    const changeUserHandler = async (id) => {
        void await updateUser({
            variables: {
                id: id,
                username: userName,
                age: userAge,
                gender: !!userGender
            },
            refetchQueries: [{query: GET_USERS_QUERY}]
        })
        if (error) {
            console.error(error)
        }
    }

    return (
        <div className='user-editor'>
            username<input
            className='user-editor__input'
            placeholder='user'
            type='text'
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
        />
            age<input
            className='user-editor__input'
            placeholder='18'
            type='number'
            value={userAge}
            onChange={(event) => setUserAge(Number(event.target.value))}
        />
            {genders.map(gender =>
                <label className='user-editor__label' key={gender}>
                    <input
                        className='user-editor__input'
                        value={gender}
                        onChange={(event) => setUserGender(event.target.value)}
                        checked={gender === userGender}
                        type="radio"/>
                    {gender}
                </label>
            )}
            <button
                disabled={userName === ''}
                className='user-editor__button'
                type='button'
                onClick={() => {
                    void changeUserHandler(id);
                    editUser(id);
                }}>submit
            </button>
            <button
                className='user-editor__button'
                type='button'
                onClick={() => {
                    editUser(id);
                }}>cancel
            </button>
        </div>
    )
}