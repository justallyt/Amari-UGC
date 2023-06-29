import { Outlet, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatorRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
    const { id } = useParams();
  return (
            userInfo !== null &&   [userInfo.username, userInfo.id].some(value => value == id) &&   
            userInfo.role === import.meta.env.VITE_CONSUMER_ROLE ? <Outlet /> : <Navigate to={'/user/login'} />
  )
}

export default CreatorRoutes