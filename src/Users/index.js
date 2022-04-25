import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {UserEditor} from "./UserEditor";
import {Link} from "react-router-dom";
import {GET_USERS_QUERY} from "../graphql/queries";
import {DELETE_USER} from "../graphql/mutations";
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

    const editUser = (id) => {
        setUsers(users.map(user => user.id === id ? {...user, change: !user.change} : user))
    }


    const removeUser = (id) => {
        setUsers(users.map(user => user.id === id ? {...user, remove: !user.remove} : user))
    }

    if (loading) return <div>Loading users...</div>

    return (
        <div className='users'>
            <h1 className='users__header'>Users</h1>
            {users?.map(user => {
                return (
                    <div
                        key={user.id}
                        className='user'>
                        {!user.change ? <div className='user__wrapper'>
                                <Link className='user__link' to={`/users/${user.username}/${user.id}`}>name: {user.username}</Link>
                                <span>age: {user.age}</span>
                                <span>gender: {user.gender ? 'Female' : 'Male'}</span>
                                <button className='user__button' type='button' onClick={() => editUser(user.id)}>edit
                                </button>
                                {user.remove ? <div className='user__buttons-group'>
                                        <button
                                            className='user__button user__button_confirm'
                                            type='button'
                                            onClick={() => deleteUserHandler(user.id)}>confirm
                                        </button>
                                        <button
                                            className='user__button user__button_cancel'
                                            type='button'
                                            onClick={() => removeUser(user.id)}>cancel
                                        </button>
                                    </div>
                                    :
                                    <button className='user__button' type='button'
                                            onClick={() => removeUser(user.id)}>delete
                                    </button>
                                }
                            </div>
                            :
                            <UserEditor editUser={editUser} id={user.id}/>
                        }
                    </div>
                )
            })}
        </div>
    )
}