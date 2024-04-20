import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import {setCredentials} from "./services/authSlice.ts";
import {useDispatch} from "react-redux";
const Nav = styled.nav`
  border-right: 1px solid #575757;
  width: 97px;
  & a {
    & > *{
      display: block;
      margin: auto;      
    }
    & > svg{
      height: 30px;
      width: 30px;
      padding: 10px;
    }
    text-align: center;
    transition: all 0.1s;
    display: block;
    padding: 8px;
    color: #9f7411;
    text-decoration: none;
  }

  & a:hover {
    background: #cfcfcf;
    color: #2b2b2b;
  }
`;

function Navigation() {
  let dispatch = useDispatch();
  return <Nav>
    <NavLink  className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    } to={'/'}><HomeOutlined/>Начало</NavLink>
    <NavLink  className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    } to={'/charts'}><TimelineOutlinedIcon/>Графики</NavLink>
    <NavLink  className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    } to={'/speed'}><DashboardCustomizeOutlinedIcon/>Настройки</NavLink>
    <NavLink to={'/weather'}>Погода</NavLink>
    <div onClick={() => dispatch(setCredentials({'token': null}))}>
      Выход
    </div>
  </Nav>;
}

export default Navigation;