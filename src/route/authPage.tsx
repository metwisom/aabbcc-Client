import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {useAddAuthMutation} from '../services/data.ts';
import {useState} from 'react';

import Logos from "../assets/logo.svg"
import {useDispatch} from "react-redux";
import { setCredentials } from '../services/authSlice'
import {LoginRequest} from "../services/auth.ts";

const Logo = styled.img`
    width: 300px;
    display: block;
    margin: 100px auto;
`

function AuthPage() {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [addAuth] = useAddAuthMutation();

    const authInitial: LoginRequest = {"login": "22", "password": "2"}
    const [authData, setAuthData] = useState<LoginRequest>(authInitial);

    const handleChange = ({target: {name, value}}: React.ChangeEvent<HTMLInputElement>) =>
        setAuthData((prev:LoginRequest)=> ({...prev, [name]: value}))


    const paperStyle = {padding: 20, width: 280, margin: "20px auto"}
    const btnstyle = {margin: '8px 0'}
    return <>
        <Grid>
            <Logo src={Logos} alt="Your SVG"/>
            <Paper elevation={10} style={paperStyle}>
                <Grid>
                    <h2>Вход</h2>
                </Grid>
                <TextField onChange={handleChange} name={"login"} label='Логин' placeholder='' variant="outlined"
                           fullWidth required/>
                <TextField onChange={handleChange} name={"password"} label='Пароль' placeholder='' variant="outlined"
                           fullWidth required type='password'/>
                <Button onClick={async () => {
                    const user = await addAuth(authData).unwrap()
                    dispatch(setCredentials(user))
                    navigate('/')
                }} type='submit' color='primary' variant="contained"
                        style={btnstyle} fullWidth>Войти</Button>
                <Typography>
                    <NavLink to="/register">
                        Регистрация
                    </NavLink>
                </Typography>
            </Paper>
        </Grid>
    </>
}

export default AuthPage