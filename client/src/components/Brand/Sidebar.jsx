import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.png"
import { RxDashboard } from "react-icons/rx"
import { GiHumanPyramid } from "react-icons/gi"
import { BsClipboardData, BsCreditCard2Front, BsPatchQuestion } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
import { CiLogout } from "react-icons/ci"
import { useLogoutUserMutation } from "../../redux/usersSlice"
import { clearCredentials } from "../../redux/authSlice"
import { clearProfile } from "../../redux/profileSlice"
import { useSelector, useDispatch } from "react-redux"
import toast, { Toaster } from "react-hot-toast"
import Spinner from '../Spinner'
import { useState } from 'react'
import { VscNotebook } from "react-icons/vsc"
import { clearBrandInfo } from '../../redux/brand/brandUtils'
import { apiSlice } from '../../redux/apiSlice'


const Sidebar = () => {
      const [wait, setWait] = useState(false);

      const {userInfo} = useSelector(state=> state.auth);
      const { profile } = useSelector(state => state.profile)

      const navigate = useNavigate();
      const dispatch = useDispatch();

      //Logout User
      const [ logoutBrand ] = useLogoutUserMutation();

      const LogOutBrand = async () => {
            try{
                  const res = await logoutBrand(userInfo).unwrap();
                  
                  setWait(true)
       
                  setTimeout(() => {
                        setWait(false)
                        dispatch(clearCredentials({...res}));
                        dispatch(clearProfile());
                        dispatch(clearBrandInfo());
                        dispatch(apiSlice.util.resetApiState())
                        navigate('/user/login')
                  }, 1500)
            }catch(error){
                  console.log(error);
                  toast.error("Logout Failed.Please try again");
            }
      }
      return (
             <div className="brand-sidebar">
                      <Toaster />
                      { wait ?  <Spinner /> : ''}
                       <div className="brand-sidebar-content">
                                <NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/`}>
                                          <div className="logo">
                                                     <img src={logo} alt="" />
                                          </div>
                                </NavLink>

                                <div className="sidebar-menu">
                                             <ul>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/`}><span><RxDashboard /></span> Dashboard</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/creators`}><span><GiHumanPyramid /></span>Creators</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/assets`}><span><BsClipboardData /></span>Assets</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/posts`}><span><VscNotebook /></span>Posts</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/billing`}><span><BsCreditCard2Front /></span>Billing</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ? profile._id : profile.username}/settings`}><span><SlSettings /></span>Settings</NavLink></li>
                                             </ul>

                                             <div className="sidebar-bottom">
                                                     <p><span><BsPatchQuestion /></span> Help & Information</p>
                                                     <p onClick={LogOutBrand}><span><CiLogout /></span> Logout</p>
                                             </div>
                                </div>

                                
                       </div>
             </div>
      ) 
}

export default Sidebar