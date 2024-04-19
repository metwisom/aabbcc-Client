import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
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
  & a.active {
    background: #777777;
    color: #2b2b2b;
  }
`;

function Navigation() {
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
  </Nav>;
}

export default Navigation;