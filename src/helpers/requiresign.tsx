import {ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "../services/useAuth.ts";

export const RequireSign = ({ children }: {children: ReactNode}) => {
    const auth = useAuth()
  const data = auth.token;

  if(data) {
      return children;
  }
  return <Navigate to='/auth' replace />
}