import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import {INSERT_USER} from "../../graphql/mutations";
import {GET_USERS_QUERY} from "../../graphql/queries";
import {
    Button, ButtonGroup,
    FormControl,
    FormControlLabel, Grid,
    Input,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select
} from "@mui/material";
import './admin.css';

export const Admin = () => {
    const genders = ['male', 'female'];
    const roles = ['developer', 'project-manager', 'administration', 'other'];
    const userAgeDefaultValue = 18;

    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState(userAgeDefaultValue);
    const [userGender, setUserGender] = useState(genders[0]);
    const [userRole, setUserRole] = useState(roles[0]);

    const [insertUser, {error}] = useMutation(INSERT_USER);
    const insertUserHandler = async () => {
        await insertUser({
            variables: {
                username: userName,
                age: userAge,
                gender: !userGender,
                role: userRole
            },
            refetchQueries: [{query: GET_USERS_QUERY}]
        })
        if (error) {
            console.error(error)
        }
    }

    return (
        <Grid
            container
            className='admin'
            spacing={0}
            justifyContent='space-evenly'
        >
           <Grid justifySelf={"center"} item>
               <h1>Create user</h1>
           </Grid>
            <Grid
                item
                xs={12}
            >
                <InputLabel>name
                    <Input
                        className='admin__input'
                        placeholder='user'
                        type='text'
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}/>
                </InputLabel>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <InputLabel>age
                    <Input
                        className='admin__input'
                        placeholder='18'
                        type='number'
                        value={userAge}
                        onChange={(event) => setUserAge(Number(event.target.value))}/>
                </InputLabel>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <FormControl>
                    <InputLabel>Role</InputLabel>
                    <Select
                        onChange={(event) => setUserRole(event.target.value)}
                        className='admin__select'
                    >
                        {roles.map(role => {
                            return (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <RadioGroup>
                    {genders.map(gender =>
                        <FormControlLabel
                            key={gender}
                            control={<Radio
                                value={gender}
                                onChange={(event) => setUserGender(event.target.value)}
                                checked={gender === userGender}
                                type="radio"/>
                            }
                            label={gender}>{gender}
                        </FormControlLabel>
                    )}
                </RadioGroup>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <ButtonGroup>
                    <Button
                        variant='userEdit'
                        disabled={userName === ''}
                        type='button'
                        onClick={() => {
                            void insertUserHandler();
                        }}>submit</Button>
                    <Button
                        variant='userEdit'
                        type='button'
                        onClick={() => {
                        }}>cancel</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    )
}