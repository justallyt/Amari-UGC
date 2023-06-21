import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ConsumerRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
  return (
           userInfo.role === import.meta.env.VITE_CONSUMER_ROLE ? <Outlet /> : <Navigate to={'/'} />
  )
}

export default ConsumerRoutes