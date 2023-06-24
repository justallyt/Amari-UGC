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
const Sidebar = () => {
      const [wait, setWait] = useState(false);

      const {userInfo} = useSelector(state=> state.auth);

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
                        dispatch(clearProfile())
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
                                <NavLink to={'/brand/'}>
                                          <div className="logo">
                                                     <img src={logo} alt="" />
                                          </div>
                                </NavLink>

                                <div className="sidebar-menu">
                                             <ul>
                                                      <li><NavLink to={'/'} className='active'><span><RxDashboard /></span> Dashboard</NavLink></li>
                                                      <li><NavLink to={'/'}><span><GiHumanPyramid /></span>Creators</NavLink></li>
                                                      <li><NavLink to={'/'}><span><BsClipboardData /></span>Creations</NavLink></li>
                                                      <li><NavLink to={'/'}><span><BsCreditCard2Front /></span>Billing</NavLink></li>
                                                      <li><NavLink to={'/'}><span><SlSettings /></span>Settings</NavLink></li>
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