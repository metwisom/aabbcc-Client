import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useRegisterMutation} from '../services/data.ts';
import React, {useEffect, useState} from 'react';

import Logos from "../assets/logo.svg"
import {LoginRequest} from "../services/auth.ts";

const Logo = styled.img`
    width: 300px;
    display: block;
    margin: 100px auto;
`

function RegisterPage() {


    const navigate = useNavigate()

    const [register, {isLoading, isSuccess, error, isError}] = useRegisterMutation();

    const authInitial: LoginRequest = {"login": "22", "password": "2"}
    const [authData, setAuthData] = useState<LoginRequest>(authInitial);

    const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) =>
        setAuthData((prev) => ({...prev, [name]: value}))

    useEffect(() => {
        if (isSuccess) {
            navigate('/login');
        }

        if (isError) {
            console.log(error);

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const paperStyle = {padding: 20, width: 280, margin: "20px auto"}
    const btnstyle = {margin: '8px 0'}
    return <>
            <Logo src={Logos}/>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                    <h2>Вход</h2>
                </Grid>
                <TextField onChange={handleChange} name="login" label='Логин' placeholder='' variant="outlined"
                           fullWidth required/>
                <TextField onChange={handleChange} name="password" label='Пароль' placeholder='' variant="outlined"
                           fullWidth required type='password'/>
                <Button onClick={async () => register(authData)} type='submit' color='primary' variant="contained"
                        style={btnstyle} fullWidth>Регистрация</Button>
                <Typography>
                    <NavLink to="/auth">Вход</NavLink>
                </Typography>
            </Paper>
    </>
}

export default RegisterPage