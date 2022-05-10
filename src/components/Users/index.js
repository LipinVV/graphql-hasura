import React, {useState, useEffect} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import {GET_USERS_QUERY} from "../../graphql/queries";
import {DELETE_USER} from "../../graphql/mutations";
import {Button, ButtonGroup, Card, Grid, List, ListItem} from "@mui/material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {UserEditor} from "./UserEditor";
import {Pagination} from "../pagination/Pagination";
import {Filters} from "../Filters";
import {LoadingScreen} from "../LoadingScreen";
import {ErrorScreen} from "../ErrorScreen";
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

    const PAGE_SIZE = 12;
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

    if (error) return <ErrorScreen />
    if (loading) return <LoadingScreen entity={'users'} />

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
            <Grid
                container spacing={{xs: 1, sm: 2, md: 3}}
                className='users__template'
            >
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
                                <Card elevation={10} className='user__wrapper'>
                                    <List>
                                        <Link
                                            className='user__link'
                                            to={`/users/${user.username}/${user.id}`}>
                                            <ListItem className='user__listItem'><AssignmentIndIcon fontSize={"large"} sx={{color: 'white', marginLeft: '-10px', marginRight: '10px'}} /> {user.username}</ListItem>
                                        </Link>
                                        <ListItem className='user__listItem'>age: {user.age}</ListItem>
                                        <ListItem className='user__listItem'>gender: {user.gender ? 'male' : 'female'}</ListItem>
                                        <ListItem className='user__listItem'>role: {user.role}</ListItem>
                                    </List>
                                    <ButtonGroup>
                                        {!user.remove && <Button
                                            variant='userEdit'
                                            className='user__button'
                                            type='button'
                                            onClick={() => editUser(user.id)}>edit
                                        </Button>}
                                        {user.remove ? <ButtonGroup
                                                className='user__buttons-group'
                                                orientation='horizontal'
                                            >
                                                <Button
                                                    variant='userEdit'
                                                    className='user__button user__button_confirm'
                                                    type='button'
                                                    onClick={() => deleteUserHandler(user.id)}>confirm
                                                </Button>
                                                <Button
                                                    variant='userDelete'
                                                    className='user__button user__button_cancel'
                                                    type='button'
                                                    onClick={() => removeUser(user.id)}>cancel
                                                </Button>
                                            </ButtonGroup>
                                            :
                                            <Button
                                                variant='userDelete'
                                                className='user__button'
                                                type='button'
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