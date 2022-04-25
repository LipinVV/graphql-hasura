import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USERS_QUERY} from "../graphql/queries";
import {DELETE_USER, UPDATE_USER} from "../graphql/mutations";
import {Admin} from "../Admin";
import './users.css';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const {loading, error, data} = useQuery(GET_USERS_QUERY);

    useEffect(() => {
        const fetchData = async () => {
            await setUsers(data?.users);
        }
        try {
            void fetchData();
        } catch (error) {
            console.error(error);
        }
    }, [data]);

    const [updateUser] = useMutation(UPDATE_USER);
    const changeUserHandler = async (id) => {
        void await updateUser({
            variables: {
                id: id,
                username: 'name2',
                age: 99,
                gender: false
            },
            refetchQueries: [{query: GET_USERS_QUERY}]
        })
        if (error) {
            console.error(error)
        }
    }

    const [deleteUser] = useMutation(DELETE_USER);
    const deleteUserHandler = async (id) => {
        void await deleteUser({
            variables: {
                id: id
            },
            refetchQueries: [{query: GET_USERS_QUERY}]
        })
        if (error) {
            console.error(error)
        }
    }

    const [startEdit, setStartEdit] = useState(false);
    const editUser = (id) => {
        setStartEdit(!startEdit);
        setUsers(users.map(user => user.id === id ? {...user, change: !startEdit} : user))
    }

    if (loading) return <div>Loading users...</div>

    return (
        <div className='users'>
            {users?.map(user => {
                return (
                    <div
                        key={user.id}
                        className='user'>
                        {!user.change ? <div>
                                <span>name: {user.username}</span>
                                <span>age: {user.age}</span>
                                <span>gender: {user.gender ? 'Female' : 'Male'}</span>
                                <button type='button' onClick={() => changeUserHandler(user.id)}>update</button>
                                <button type='button' onClick={() => deleteUserHandler(user.id)}>delete</button>
                                <button type='button' onClick={() => editUser(user.id)}>edit</button>
                            </div>
                            :
                            <Admin editUser={editUser} id={user.id}/>
                        }
                    </div>
                )
            })}
        </div>
    )
}