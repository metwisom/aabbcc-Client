import {ReactNode} from 'react';
import {useAuth} from "../services/useAuth.ts";
import {Navigate} from "react-router-dom";

export const RequireSign = ({children}: { children: ReactNode }) => {
    const auth = useAuth()

    console.log(!auth.token)
    if (!auth.token) {
        return <Navigate to="/auth" />
    }
    return children;
}