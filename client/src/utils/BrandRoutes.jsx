import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const BrandRoutes = () => {
        const { userInfo } = useSelector(state => state.auth)

        const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic=') || item.startsWith('mimic='))
           return (
                   userInfo &&  
                   cookie &&
                  userInfo.role === import.meta.env.VITE_BRAND_ROLE ? <Outlet /> : <Navigate to={'/user/login'} />
           )
}


export default BrandRoutes