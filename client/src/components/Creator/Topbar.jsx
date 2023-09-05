/* eslint-disable react/prop-types */
import { TbSearch } from "react-icons/tb"
import { IoMdNotificationsOutline } from "react-icons/io"
import { BsEnvelope } from "react-icons/bs" 
import { FaRegUser } from "react-icons/fa"
import { NavLink, useNavigate} from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useGetUserNotificationsQuery, useLogoutUserMutation } from "../../redux/usersSlice"
import { clearCredentials } from "../../redux/authSlice"
import { clearProfile, setNotifications } from "../../redux/profileSlice"
import { useSelector, useDispatch } from "react-redux"
import toast, { Toaster } from "react-hot-toast"
import Spinner from "../Spinner"
import profileImg from "../../assets/dummyprofile.png"
import { apiSlice } from "../../redux/apiSlice"
import { clearUtils } from "../../redux/utilsSlices"
import { CgClose } from "react-icons/cg"

const Topbar = ({ user}) => {
  const [ status, setStatus ] = useState(false)
  const [wait, setWait] = useState(false);
  const boxRef = useRef()
  const {userInfo} = useSelector(state=> state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
    //get user notifications
    const { data, isLoading} = useGetUserNotificationsQuery();
  
  useEffect(() => {
           document.addEventListener("click", handleClick, true)

           if(data && !isLoading){
                  dispatch(setNotifications([...data.notifications]))
           }
  }, [data, dispatch, isLoading])

  const handleClick = (e) => {
          if(boxRef.current && !boxRef.current.contains(e.target)){
                 setStatus(false);
          }else{
                 setStatus(true)
          }
  }
 

  //Logout User
const [ logoutConsumer ] = useLogoutUserMutation();

  const LogoutUser = async () => {
         try{
               const res = await logoutConsumer(userInfo).unwrap();
               
               setWait(true)
    
               setTimeout(() => {
                     setWait(false)
                     dispatch(clearCredentials({...res}));
                     dispatch(clearProfile());
                     dispatch(clearUtils());
                     dispatch(apiSlice.util.resetApiState())
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
                                        <div className="red-dot"></div>
                             </div>
                             <div className="notification-fly-box">
                                       <div className="box-header">
                                                  <h3>Notifications</h3>
                                                  <span><CgClose /></span>
                                       </div>
                                       <div className="box-body">
                                                   <div className="box-notification-moja">
                                                              <div className="box-profile">
                                                                        <span className="approval">A</span>
                                                              </div>
                                                              <div className="box-texts">
                                                                       <p>You have been approved to work with Unilever</p>
                                                                       <span>24 May at 1.38pm</span>
                                                              </div>
                                                   </div>
                                                   <div className="box-notification-moja">
                                                              <div className="box-profile">
                                                                        <span className="request">R</span>
                                                              </div>
                                                              <div className="box-texts">
                                                                       <p>You have requested to work with Unilever</p>
                                                                       <span>24 May at 1.38pm</span>
                                                              </div>
                                                   </div>
                                       </div>
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

                                   <NavLink className='profile-link'>
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

