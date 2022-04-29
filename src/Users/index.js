import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {GET_USERS_QUERY} from "../graphql/queries";
import {DELETE_USER} from "../graphql/mutations";
import {UserEditor} from "./UserEditor";
import {Pagination} from "../components/pagination/Pagination";
import {Filters} from "../Filters";
import {Button, ButtonGroup, Card, Grid, MenuItem, Paper} from "@mui/material";

import './users.css';

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
        gender: ['male', 'female'],
        age: ['asc', 'desc'],
        role: ['developer', 'project-manager', 'administration', 'other'],
    }

    const [filter, setFilter] = useState({gender: [], age: [], role: []});


    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 8;
    const indexOfLastItem = currentPage * PAGE_SIZE;
    const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
    const currentUsersOnThePage = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);

    const editUser = (id) => {
        setUsers(users.map(user => user.id === id ? {...user, change: !user.change} : user))
    }

    useEffect(() => {
        const getFilteredUsers = (usersFromState, filter) => {
            let result = usersFromState;
            if (filter?.gender.length > 0) {
                result = result?.filter(user => {
                    const gender = user.gender === false ? 'female' : 'male';
                    return filter.gender.includes(gender);
                })
            }
            if (filter?.age[0] === 'desc') {
                result = result?.slice().sort((a, b) => b.age - a.age);
            }
            if (filter?.age[0] === 'asc') {
                result = result?.slice().sort((a, b) => a.age - b.age);
            }
            if (filter?.role.length > 0) {
                result = result?.filter(user => {
                    const role = user.role;
                    return filter.role.includes(role);
                })
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
                currentUsersOnThePage={currentUsersOnThePage}
            />
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='users__template'>
                {currentUsersOnThePage?.map(user => {
                    return (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={user.id}
                            className='user'>
                            {!user.change ?
                                <Card className='user__wrapper'>
                                    <Link
                                        className='user__link'
                                        to={`/users/${user.username}/${user.id}`}>
                                        name: {user.username}
                                    </Link>
                                    <MenuItem>age: {user.age}</MenuItem>
                                    <MenuItem>gender: {user.gender ? 'male' : 'female'}</MenuItem>
                                    <MenuItem>role: {user.role}</MenuItem>
                                    <ButtonGroup>
                                        {!user.remove && <Button className='user__button' type='button'
                                                 onClick={() => editUser(user.id)}>edit
                                        </Button>}
                                        {user.remove ? <Paper className='user__buttons-group'>
                                                <ButtonGroup orientation='horizontal'>
                                                    <Button
                                                        className='user__button user__button_confirm'
                                                        type='button'
                                                        onClick={() => deleteUserHandler(user.id)}>confirm
                                                    </Button>
                                                    <Button
                                                        className='user__button user__button_cancel'
                                                        type='button'
                                                        onClick={() => removeUser(user.id)}>cancel
                                                    </Button>
                                                </ButtonGroup>
                                            </Paper>
                                            :
                                            <Button className='user__button' type='button'
                                                    onClick={() => removeUser(user.id)}>delete
                                            </Button>
                                        }
                                    </ButtonGroup>
                                </Card>
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
                        </Grid>
                    )
                })}
            </Grid>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                users={users}
                filteredUsers={filteredUsers}
                currentUsersOnThePage={currentUsersOnThePage}
                pageSize={PAGE_SIZE}
                indexOfLastItem={indexOfLastItem}
            />
        </div>
    )
}