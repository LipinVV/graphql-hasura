import {gql} from "@apollo/client";

export const GET_USERS_QUERY = gql`
    query getUsers {
        users {
            age
            gender
            id
            username
            role
        }
    }`;

export const GET_USER = gql`
    query getUsers($id: Int!) {
        users_by_pk(id: $id) {
            age
            gender
            id
            username
        }
    }`;