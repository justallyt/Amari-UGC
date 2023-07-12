import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
  return (
        userInfo !== null &&   
        userInfo.role === import.meta.env.VITE_ADMIN_ROLE ? <Outlet /> : <Navigate to={'/user/login'} />
  )
}

export default AdminRoutes