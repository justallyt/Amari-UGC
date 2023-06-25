import { Outlet, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const BrandRoutes = () => {
        const { userInfo } = useSelector(state => state.auth)
        const { id } = useParams();
           return (
                  [userInfo.id, userInfo.username].some(val => val === id) &&
                   userInfo &&  
                  userInfo.role === import.meta.env.VITE_BRAND_ROLE ? <Outlet /> : <Navigate to={'/user/login'} />
           )
}


export default BrandRoutes