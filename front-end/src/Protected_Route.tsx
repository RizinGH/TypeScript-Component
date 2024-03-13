import React from 'react'
import { Navigate } from 'react-router-dom'

export const Protected = ({children}:any) => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/' />;
    }
    return children;
}

export const LoginProtect =({children}:any) => {
    if(localStorage.getItem('token')){
        localStorage.clear()
    }
    return children;
}
