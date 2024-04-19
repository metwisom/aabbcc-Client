import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';

export const RequireSign = ({ children }: {children: ReactNode}) => {
  const data = localStorage.getItem('users');

  if(data) {
      return children;
  }
  return <Navigate to='/auth' replace />
}