import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {UserEditor} from "./UserEditor";
import {Link} from "react-router-dom";
import {Filters} from "../Filters";
import {GET_USERS_QUERY} from "../graphql/queries";
import {DELETE_USER} from "../graphql/mutations";

import './users.css';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const {loading, error, data} = useQuery(GET_USERS_QUERY);
    // console.log(filteredUsers)
    useEffect(() => {
        const fetchData = async () => {
            await setUsers(data?.users);
            await setFilteredUsers(data?.users);
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

    const searchUserHandler = (word, users) => {
        const arrangedUsers = users.filter((user) => {
            if (word === '') {
                return user;
            }
            if (user.username.toLowerCase().includes(word.toLowerCase()) ||
                user.username.toLowerCase().includes(word.toLowerCase())) {
                return user;
            }
        })
        setUsers(arrangedUsers);
    }

    const options = {
        gender: ['male', 'female', 'all'],
        age: [true, false],
        role: ['developer', 'project-manager', 'administration', 'other', 'all'],
    }

    const [filter, setFilter] = useState({gender: [], age: [], role: []});


    useEffect(() => {
        const getFilteredUsers = (usersFromState, filter) => {
            let result = usersFromState;
            if (filter?.gender.length > 0) {
                result = result?.filter(user => {
                    const gender = user.gender === false ? 'female' : 'male';
                    return filter.gender.includes(gender);
                })
            }
            if (filter?.gender.at(-1) === 'all') {
                return usersFromState;
            }
            if (filter?.age.at(-1) === true) {
                result = result?.slice().sort((a, b) => b.age - a.age);
            }
            if (filter?.age.at(-1) === false) {
                result = result?.slice().sort((a, b) => a.age - b.age);
            }
            if(filter.role.length > 0) {
                result = result?.filter(user => {
                    const role = user.role;
                    return filter.role.includes(role);
                })
            }
            if (filter?.role.at(-1) === 'all') {
                return usersFromState;
            }
            return result;
        }
        setFilteredUsers(getFilteredUsers(users, filter));
    }, [filter, users])

    if (error) return <div>Something went wrong</div>
    if (loading) return <div>Loading users...</div>

    return (
        <div className='users'>
            <h1 className='users__header'>Users</h1>
            <Filters
                data={data}
                searchUserHandler={searchUserHandler}
                options={options}
                filter={filter}
                setFilter={setFilter}
            />
            {filteredUsers?.map(user => {
                return (
                    <div
                        key={user.id}
                        className='user'>
                        {!user.change ? <div className='user__wrapper'>
                                <Link
                                    className='user__link'
                                      to={`/users/${user.username}/${user.id}`}>
                                    name: {user.username}
                                </Link>
                                <span>age: {user.age}</span>
                                <span>gender: {user.gender ? 'male' : 'female'}</span>
                                <span>role: {user.role}</span>
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
                            <UserEditor
                                name={user.username}
                                age={user.age}
                                gender={user.gender}
                                role={user.role}
                                options={options}
                                editUser={editUser}
                                id={user.id}
                            />
                        }
                    </div>
                )
            })}
        </div>
    )
}