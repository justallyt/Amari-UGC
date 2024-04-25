import { Outlet,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../redux/usersSlice";
import { clearCredentials } from "../redux/authSlice";
import { clearProfile } from "../redux/profileSlice";
import { clearBrandInfo } from "../redux/brand/brandUtils";
import { apiSlice } from "../redux/apiSlice";
const BrandRoutes = () => {
        const { userInfo } = useSelector(state => state.auth)
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [ logoutBrand ] = useLogoutUserMutation();

        const cookie = document.cookie.split(';').some(item => item.startsWith(' mimic=') || item.startsWith('mimic='))

        const logOutUser = async() => {
                const res = await logoutBrand(userInfo).unwrap();

                if(res) dispatch(clearCredentials({...res}));
                dispatch(clearProfile());
                dispatch(clearBrandInfo());
                dispatch(apiSlice.util.resetApiState());
                navigate("/user/login")
        }
        return (
                   userInfo &&  
                   cookie &&
                  userInfo.role === import.meta.env.VITE_BRAND_ROLE ? <Outlet /> :    logOutUser()    //<Navigate to={'/user/login'} />
           )
}


export default BrandRoutes