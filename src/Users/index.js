import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {UserEditor} from "./UserEditor";
import {Link} from "react-router-dom";
import {GET_USERS_QUERY} from "../graphql/queries";
import {DELETE_USER} from "../graphql/mutations";
import './users.css';
import {Filters} from "../Filters";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const {loading, error, data} = useQuery(GET_USERS_QUERY);

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
        gender: ['Male', 'Female', 'All'],
        age: [true, false]
    }

    const [filter, setFilter] = useState({gender: [], age: []});


    useEffect(() => {
        const getFilteredProducts = (usersFromState, filter) => {
            let result = usersFromState;
            if (filter?.gender.length > 0) {
                result = result?.filter(user => {
                    const gender = user.gender === true ? 'Female' : 'Male';
                    return filter.gender.includes(gender);
                })
            }
            if (filter?.gender.at(-1) === 'All') {
                return usersFromState;
            }
            if(filter?.age.at(-1) === true) {
                result = result?.slice().sort((a, b) => b.age - a.age);
            }
            if(filter?.age.at(-1) === false) {
                result = result?.slice().sort((a, b) => a.age - b.age);
            }
            return result;
        }
        setFilteredUsers(getFilteredProducts(users, filter));
    }, [filter, users])

    if (error) return <div>Something went wrong</div>
    if (loading) return <div>Loading users...</div>

    return (
        <div className='users'>
            <label className='users__search-label'>
                Search a user
                <input
                    placeholder='type a product...'
                    className='users__search-input'
                    type='text'
                    onChange={(e) => searchUserHandler(e.target.value, data?.users)}/>
            </label>
            <h1 className='users__header'>Users</h1>
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
            {filteredUsers?.map(user => {
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