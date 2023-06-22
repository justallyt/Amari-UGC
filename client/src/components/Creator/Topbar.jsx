/* eslint-disable react/prop-types */
import { TbSearch } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsEnvelope } from "react-icons/bs" 
import { FaRegUser } from "react-icons/fa"
import { NavLink, useNavigate} from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useLogoutUserMutation } from "../../redux/usersSlice"
import { clearCredentials } from "../../redux/authSlice"
import { clearProfile } from "../../redux/profileSlice"
import { useSelector, useDispatch } from "react-redux"
import toast, { Toaster } from "react-hot-toast"
import Spinner from "../Spinner"
import profileImg from "../../assets/dummyprofile.png"

const Topbar = ({ user}) => {
  const [ status, setStatus ] = useState(false)
  const [wait, setWait] = useState(false);
  const boxRef = useRef()

  useEffect(() => {
           document.addEventListener("click", handleClick, true)
  }, [])

  const handleClick = (e) => {
          if(boxRef.current && !boxRef.current.contains(e.target)){
                 setStatus(false);
          }else{
                 setStatus(true)
          }
  }
 
  const {userInfo} = useSelector(state=> state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Logout User
const [ logoutConsumer ] = useLogoutUserMutation();

  const LogoutUser = async () => {
         try{
               const res = await logoutConsumer(userInfo).unwrap();
               
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
    <div className="topbar-section">
                  <Toaster />
                  { wait ?  <Spinner /> : ''}
                  <div className="search-bar">
                             <span><TbSearch /></span>
                             <input type="text" placeholder="Search" className="search-control" />
                  </div>
                  <div className="notification-profile">
                             <div className="notification">
                                        <span><IoMdNotificationsOutline /></span>
                                        <span className="red-dot"></span>
                             </div>
                             <div className="profile-part" onClick={() => setStatus(true)}>
                                         <div className="profile-image">
                                                   { user !== null ? 
                                                           <img src={user.profilePic.url !== 'null' ? user.profilePic.url : profileImg} alt="" />
                                                       :
                                                       <img src={profileImg} alt="" />
                                                    }
                                                   
                                         </div>
                             </div>
                  </div>
                  <div className={status ? "fly-box active"  : "fly-box"  } ref={boxRef}>
                          <div className="fly-box-wrap">
                                   <h4>User Profile</h4>

                                   <div className="account-profile">
                                             <div className="account-image">
                                                    { user !== null ? 
                                                           <img src={user.profilePic.url !== 'null' ? user.profilePic.url : profileImg} alt="" />
                                                       :
                                                       <img src={profileImg} alt="" />
                                                    }
                                             </div>
                                             <div className="account-details">
                                                         <h3>{user && user.name}</h3>
                                                         <p><span><BsEnvelope /></span> {user && user.email}</p>
                                             </div>
                                   </div>

                                   <NavLink to={`/creator/${user._id}/settings/profile`} className='profile-link'>
                                               <span><FaRegUser /></span>
                                                 <div className="deets">
                                                             <h4>My Account</h4>
                                                             <p>Profile Settings</p>
                                                 </div>
                                   </NavLink>
                                   <div className="logout-btn">
                                             <button onClick={LogoutUser}>Logout</button>
                                   </div>
                           </div>
                  </div>
    </div>
  )
}

export default Topbar

