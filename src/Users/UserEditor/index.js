import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {GET_USERS_QUERY} from "../../graphql/queries";
import {UPDATE_USER} from "../../graphql/mutations";
import './userEditor.css';
import {RadioButton} from "../../components/tools/RadioButton";

export const UserEditor = ({name, age, role, gender, options, editUser, id}) => {

    const [userName, setUserName] = useState(name);
    const [userAge, setUserAge] = useState(age);
    const [userGender, setUserGender] = useState(gender ? 'female' : 'male');
    const [userRole, setUserRole] = useState(role);

    const [updateUser, {error}] = useMutation(UPDATE_USER);
    const changeUserHandler = async (id) => {
        void await updateUser({
            variables: {
                id: id,
                username: userName,
                age: userAge,
                gender: !!userGender,
                role: userRole
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
            <select onChange={(event) => setUserRole(event.target.value)}>
                {options.role.slice(0, -1).map(role => {
                    return (
                        <option key={role} value={role}>{role}</option>
                    )
                })}
            </select>
            {options.gender.slice(0, -1).map(gender =>
                <RadioButton
                    key={gender}
                    option={gender}
                    userOption={userGender}
                    setUserOption={setUserGender}
                />
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