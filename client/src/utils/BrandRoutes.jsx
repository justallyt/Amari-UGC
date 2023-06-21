import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const BrandRoutes = () => {
        const { userInfo } = useSelector(state => state.auth)
           return (
                   userInfo &&  userInfo.role === import.meta.env.VITE_BRAND_ROLE ? <Outlet /> : <Navigate to={'/'} />
           )
}


export default BrandRoutes