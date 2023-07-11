
import { Outlet, Navigate } from "react-router-dom";

const CreatorRoutes = ({ logger }) => {
  
  return (
           logger  ? <Outlet /> : <Navigate to={'/user/login'} />
  )
}

export default CreatorRoutes