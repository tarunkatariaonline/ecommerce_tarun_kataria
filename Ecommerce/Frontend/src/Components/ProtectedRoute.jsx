import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({isAuth,children,isAdmin,adminRoute}) => {
 
    if(!isAuth){
        return <Navigate to={'/user/login'}/>
    }

    if(isAdmin && !adminRoute){
          return <Navigate to={'/user/account'}/>
       
    }
    return <Outlet/>


}

export default ProtectedRoute