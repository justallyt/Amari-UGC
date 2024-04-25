import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../redux/usersSlice";
import { clearCredentials } from "../redux/authSlice";
import { clearProfile } from "../redux/profileSlice";
import { clearAllUtils } from "../redux/admin/adminUtils";
import { apiSlice } from "../redux/apiSlice";

const AdminRoutes = () => {
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ logoutAdmin ] = useLogoutUserMutation();
    const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic=') || item.startsWith('mimic='))

    const logOutUser = async () => {
           const res = await logoutAdmin(userInfo).unwrap();

           if(res) dispatch(clearCredentials({...res}));
           dispatch(clearProfile());
           dispatch(clearAllUtils());
           dispatch(apiSlice.util.resetApiState());
           navigate("/user/login");
    }
  return (
        userInfo !== null &&   
        cookie &&
        userInfo.role === import.meta.env.VITE_ADMIN_ROLE ? <Outlet /> :     logOutUser()     //<Navigate to={'/user/login'} />
  )
}

export default AdminRoutes