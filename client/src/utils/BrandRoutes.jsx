import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../redux/authSlice";
import { useEffect } from "react";
const BrandRoutes = () => {
        const { userInfo } = useSelector(state => state.auth)
        const dispatch = useDispatch();
        const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic=') || item.startsWith('mimic='))

        useEffect(() => {
                if(!cookie) dispatch(clearCredentials())
        }, [cookie, dispatch])
        return (
                   userInfo &&  
                   cookie &&
                  userInfo.role === import.meta.env.VITE_BRAND_ROLE ? <Outlet /> : <Navigate to={'/user/login'} />
           )
}


export default BrandRoutes