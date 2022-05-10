import React from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../../../graphql/queries";
import {List, ListItem} from "@mui/material";
import {ErrorScreen} from "../../ErrorScreen";
import {LoadingScreen} from "../../LoadingScreen";
import './user.css';

export const User = () => {
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_USER, {
        variables: {
            id
        }
    });
    const user = data?.users_by_pk;

    if (error) return <ErrorScreen />
    if (loading) return <LoadingScreen entity={'user'} />

    return (
        <List className='user-card'>
            <ListItem className='user-card__info'>
                name: {user?.username}
            </ListItem>
            <ListItem className='user-card__info'>
               id: {user?.id}
            </ListItem>
            <ListItem className='user-card__info'>
                 gender: {!user?.gender ? 'Male' : 'Female'}
            </ListItem>
            <ListItem className='user-card__info'>
                age: {user?.age}
            </ListItem>
        </List>
    )
}