import { useDispatch, useSelector } from "react-redux"
import Topbar from "./Topbar"
import { calculateTimePassed, sanitizeNotifications } from "../../utils/dateConverter";
import { useGetUserNotificationsQuery, useReadAllUserNotificationsMutation } from "../../redux/usersSlice";
import { useEffect } from "react";
import { setAllNotifications } from "../../redux/profileSlice";
import SpinnerData from "../SpinnerData"
import toast from "react-hot-toast";

const NotificationsBody = () => {
    const { profile, all_notifications } = useSelector(state => state.profile);
    const dispatch = useDispatch()
    const { data, isLoading } = useGetUserNotificationsQuery();

    useEffect(() => {
          
          if(data){
                dispatch(setAllNotifications([...data.notifications]))
          }
    },[data, dispatch])

    //mark all notifications as read
    const [markAllNotificationsAsRead] = useReadAllUserNotificationsMutation();

    const readAllNotifications = async() => {
          try{
                  const res =  await markAllNotificationsAsRead().unwrap();

                  if(res){
                         toast.success(res.msg, { id: 'notify-update-success'})
                  }
          }catch (error){
                console.log(error); 
                toast.error("Notification error.", { id: 'notify-update-error'})
          }
    }
  return (
    <div className="dashboard-body-wrap">
                <div className="dashboard-row">
                           <Topbar user={profile} />

                           <div className="notifications-wrapper">
                                      <div className="notifications-wrapper-head">
                                               <h2>All Notifications</h2>
                                               <button onClick={readAllNotifications}>Mark All As Read</button>
                                      </div>

                                      <div className="notifications-row">
                                                { isLoading ? 
                                                       <div className="spinner-loader">
                                                                 <SpinnerData />
                                                       </div>
                                                : 
                                                <>
                                                { sanitizeNotifications(all_notifications).map(item => 
                                                 <div className="notification-moja" key={item._id}>
                                                         <div className="notification-moja-left">
                                                                  <div className="notification-profile">
                                                                            <img src={item.sender.profilePhoto} alt="" />
                                                                  </div>
                                                                  <div className="notification-texts">
                                                                             
                                                                             { item.notification_type === 'Request' ? <p className={item.sender.isRead ? 'read' : ''}>{item.sender.senderMsg}</p> : <p className={item.receipient.isRead ? 'read' : ''}>{item.receipient.receipientMsg}</p>}
                                                                            <span>{calculateTimePassed(item.createdAt)}</span>
                                                                  </div>
                                                         </div>
                                                         {/* <div className="notification-moja-right">
                                                                   <button>Mark as Read</button>
                                                         </div> */}
                                               </div>
                                                )}
                                                 </>}
                                      </div>
                           </div>
                </div>
    </div>
  )
}

export default NotificationsBody