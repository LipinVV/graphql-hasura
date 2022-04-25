import {gql} from "@apollo/client";

export const INSERT_USER = gql`
    mutation insert_users_one($username: String! $gender: Boolean! $age: Int!) {
        insert_users_one(object: {username: $username gender: $gender age: $age}) {
            username
            gender
            age
        }
    }`;

export const UPDATE_USER = gql`
    mutation update_users_by_pk($username: String! $id: Int! $age: Int! $gender: Boolean!) {
        update_users_by_pk(pk_columns: {id: $id}, _set: {username: $username age: $age gender: $gender}) {
            age
            gender
            username
        }
    }
`;

export const DELETE_USER = gql`
    mutation delete_users_by_pk($id: Int!) {
        delete_users_by_pk(id: $id) {
            id
        }
    }
`;