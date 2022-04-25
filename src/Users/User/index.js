import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_USER} from "../../graphql/queries";
import React from 'react';


export const User = () => {
    const {id} = useParams();
    const {loading, error, data} = useQuery(GET_USER, {
        variables: {
            id
        }
    });
    const user = data?.users_by_pk;

    if (loading) return <div>Loading user...</div>

    return (
        <div style={{display: 'grid'}}>
            <span>
               id: {user?.id}
            </span>
            <span>
                name: {user?.username}
            </span>
            <span>
                 gender: {!user?.gender ? 'Male' : 'Female'}
            </span>
            <span>
                age: {user?.age}
            </span>
        </div>
    )
}