import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearCredentials } from "../redux/authSlice";

const CreatorRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
    const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic=') || item.startsWith('mimic='))
    const dispatch = useDispatch();

   useEffect(() => {
          if(!cookie) dispatch(clearCredentials())
   }, [cookie, dispatch])
  
    return (
            userInfo !== null &&   
            cookie && 
            userInfo.role === import.meta.env.VITE_CONSUMER_ROLE ? <Outlet /> :  <Navigate to={'/user/login'} />
    )
}

export default CreatorRoutes