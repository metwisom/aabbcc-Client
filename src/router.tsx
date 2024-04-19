import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './layout.tsx';
import Charts from './route/charts.tsx';
import Unavailable from './route/unavailable.tsx';
import Index from './route';
import {RequireSign} from './helpers/requiresign.tsx';
import AuthPage from './route/authPage.tsx';


function Router() {
  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <AuthPage/>,
    },
    {
      path: '',
      element: <RequireSign><Layout/></RequireSign>,
      children: [
        {
          path: '/',
          element: <Index/>,
        },
        {
          path: '/charts',
          element: <Charts/>,
        },
        {
          path: '*',
          element: <Unavailable/>,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default Router;
