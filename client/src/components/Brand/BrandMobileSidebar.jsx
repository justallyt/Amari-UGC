import { Link } from "react-router-dom"
import { CgClose } from "react-icons/cg";
import logo from "../../assets/logo.png"
import { useContext, useEffect, useRef } from "react";
import { brandSidebarContext } from "./context/sidebar";
import { NavLink, useNavigate } from 'react-router-dom'
import { BsClipboardData, BsCreditCard2Front, BsPatchQuestion, BsGift } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
import { CiLogout } from "react-icons/ci"
import { RxDashboard } from "react-icons/rx"
import { GiHumanPyramid } from "react-icons/gi"
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

const BrandMobileSidebar = () => {
    const [sidebarStatus, setSidebarStatus] = useContext(brandSidebarContext);
    const sidebarRef = useRef()
  
    const closeSidebar = () => setSidebarStatus(!sidebarStatus);
    const handleSidebarOffclick = (e) => {
             if(sidebarRef && !sidebarRef.current.contains(e.target)){
                    setSidebarStatus(false)
             }
    }

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

    useEffect(() => {
            document.addEventListener("click", handleSidebarOffclick, true);
    })

  return (
    <>
               <Toaster />
                { wait ?  <Spinner /> : ''}
                <div className={sidebarStatus ? "brand-mobile-sidebar active" : "brand-mobile-sidebar"}>
                    <div ref={sidebarRef}   className={ sidebarStatus ? "mobile-brand-sidebar active" : "mobile-brand-sidebar"}>
                           <div className="mobile-brand-header">
                                      <Link to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/`}>
                                                 <img src={logo} alt="" />
                                      </Link>
                                      <span className="close-sidebar" onClick={closeSidebar}>
                                                <CgClose />
                                      </span>
                           </div>
                          
                          <div className="sidebar-menu">
                                             <ul>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/`}><span><RxDashboard /></span> Dashboard</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/creators`}><span><GiHumanPyramid /></span>Creators</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/assets`}><span><BsClipboardData /></span>Assets</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/posts`} className='disable'><span><VscNotebook /></span>Posts</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/billing`} className="disable"><span><BsCreditCard2Front /></span>Billing</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ?  profile._id : profile.username}/rewards`}><span><BsGift /></span>Rewards</NavLink></li>
                                                      <li><NavLink to={`/brand/${profile.username === 'null' ? profile._id : profile.username}/settings`}><span><SlSettings /></span>Settings</NavLink></li>
                                             </ul>

                                             <div className="sidebar-bottom">
                                                     <p><span><BsPatchQuestion /></span> Help & Information</p>
                                                     <p onClick={LogOutBrand}><span><CiLogout /></span> Logout</p>
                                             </div>
                                </div>                          
                  </div>
         </div>
    </>
  )
}

export default BrandMobileSidebar