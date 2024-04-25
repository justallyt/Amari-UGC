import { Outlet,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile } from "../redux/profileSlice";
import { clearUtils } from "../redux/utilsSlices";
import { apiSlice } from "../redux/apiSlice";
import { useLogoutUserMutation } from "../redux/usersSlice";
import { clearCredentials } from "../redux/authSlice";

const CreatorRoutes = () => {
    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ logoutConsumer ] = useLogoutUserMutation();
    const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic=') || item.startsWith('mimic='))

    const logOutUser = async () => {
             const res = await logoutConsumer(userInfo).unwrap();
             if(res) dispatch(clearCredentials({...res}));
             dispatch(clearProfile());
             dispatch(clearUtils());
             dispatch(apiSlice.util.resetApiState());
             navigate("/user/login");
    }
  return (
            userInfo !== null &&   
            cookie && 
            userInfo.role === import.meta.env.VITE_CONSUMER_ROLE ? <Outlet /> :  logOutUser()//<Navigate to={'/user/login'} />
  )
}

export default CreatorRoutes