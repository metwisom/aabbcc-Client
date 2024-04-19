import {Outlet} from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './navigation.tsx';

const MainLayout = styled.div`
  display: table;
  width: 100vw;
  height: 100vh;

  & > * {
    display: table-cell;
    vertical-align: top;
  }
`;

const Main = styled.main`
  padding: 10px;
  margin: auto;
  width: 800px;
`;


function Layout() {
  return <>
    <MainLayout>
      <Navigation/>
      <Main>
        <Outlet/>
      </Main>
    </MainLayout>
  </>;
}


export default Layout;