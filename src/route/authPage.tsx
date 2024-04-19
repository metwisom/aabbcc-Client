import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Auth, useAddAuthMutation} from '../services/data.ts';
import {useState} from 'react';

const Logo = styled.h1`
  font-size: 50px;
  font-weight: 900;
  font-style: italic;
  font-family: monospace;
  text-align: center;
  & > .f1 {
    color: #d12c2c;
  }
  & > .f2 {
    color: #1a771a;
  }
  & > .f3 {
    color: #6161db;
  }
`

function AuthPage(){

  const [addAuth] = useAddAuthMutation();

  const authInitial: Auth = {"login":"22","password":"2"}
  const [authData] = useState<Auth>(authInitial);

  const paperStyle={padding :20,width:280, margin:"20px auto"}
  const btnstyle={margin:'8px 0'}
  return <>
    <Grid>
      <Logo><span className={'f1'}>aa</span><span className={'f2'}>BB</span><span className={'f3'}>cc</span></Logo>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <h2>Вход</h2>
        </Grid>
        <TextField label='Логин' placeholder='' variant="outlined" fullWidth required/>
        <TextField label='Пароль' placeholder='' type='password' variant="outlined" fullWidth required/>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button onClick={() => addAuth(authData)} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
        <Typography >
          <Link to="#" >
            Регистрация
          </Link>
        </Typography>
      </Paper>
    </Grid>
  </>
}

export default AuthPage