import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {GET_USERS_QUERY} from "../../graphql/queries";
import {UPDATE_USER} from "../../graphql/mutations";
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Paper, Radio, RadioGroup,
    Select
} from "@mui/material";
import {RadioButton} from "../../components/tools/RadioButton";
import './userEditor.css';

export const UserEditor = ({name, age, role, gender, options, editUser, id}) => {

    const [userName, setUserName] = useState(name);
    const [userAge, setUserAge] = useState(age);
    const [userGender, setUserGender] = useState(gender);
    const [userRole, setUserRole] = useState(role);

    const [updateUser, {error}] = useMutation(UPDATE_USER);
    const changeUserHandler = async (id) => {
        void await updateUser({
            variables: {
                id: id,
                username: userName,
                age: userAge,
                gender: !!userGender,
                role: userRole
            },
            refetchQueries: [{query: GET_USERS_QUERY}]
        })
        if (error) {
            console.error(error)
        }
    }

    return (
        <Card
            className='user-editor'
        >
            <CardContent
                className='user-editor_content'
            >
                <InputLabel>
                    <Input
                        className='user-editor__input'
                        placeholder='user'
                        type='text'
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </InputLabel>
                <InputLabel>
                    <Input
                        className='user-editor__input'
                        placeholder='age'
                        type='number'
                        value={userAge}
                        onChange={(event) => setUserAge(Number(event.target.value))}
                    />
                </InputLabel>
                <FormControl className='user-editor__select'>
                    <InputLabel id='user-editor__select-label'>Role</InputLabel>
                    <Select labelId='editor__select' label='Role' onChange={(event) => setUserRole(event.target.value)}>
                        {options.role.slice(0, -1).map(role => {
                            return (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Paper
                    elevation={14}
                    className='user-editor_radio'
                >
                    {options.gender.map(gender =>
                        <RadioGroup
                            key={gender}
                            sx={{height: '35px', justifyContent: 'center'}}
                        >
                            <Radio
                                size={'small'}
                                type='radio'
                                value={gender}
                                checked={gender === userGender}
                                onChange={(event) => setUserGender(event.target.value)}
                            />{gender}
                        </RadioGroup>
                    )}
                </Paper>
                <ButtonGroup orientation='horizontal'>
                    <Button
                        disabled={userName === ''}
                        className='user-editor__button'
                        type='button'
                        onClick={() => {
                            void changeUserHandler(id);
                            editUser(id);
                        }}>submit
                    </Button>
                    <Button
                        className='user-editor__button'
                        type='button'
                        onClick={() => {
                            editUser(id);
                        }}>cancel
                    </Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}