import { Outlet, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const BrandRoutes = () => {
        const { userInfo } = useSelector(state => state.auth)
        const { id } = useParams();
        const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic='))
           return (
                  [userInfo.id, userInfo.username].some(val => val === id) &&
                   userInfo &&  
                   cookie &&
                  userInfo.role === import.meta.env.VITE_BRAND_ROLE ? <Outlet /> : <Navigate to={'/user/login'} />
           )
}


export default BrandRoutes