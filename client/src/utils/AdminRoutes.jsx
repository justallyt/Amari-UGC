import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
    const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic=') || item.startsWith('mimic='))
  return (
        userInfo !== null &&   
        cookie &&
        userInfo.role === import.meta.env.VITE_ADMIN_ROLE ? <Outlet /> : <Navigate to={'/user/login'} />
  )
}

export default AdminRoutes