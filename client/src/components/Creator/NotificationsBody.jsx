import { useSelector } from "react-redux"
import Topbar from "./Topbar"
import { calculateTimePassed, sanitizeNotifications } from "../../utils/dateConverter";

const NotificationsBody = () => {
    const { profile, my_notifications } = useSelector(state => state.profile);
  return (
    <div className="dashboard-body-wrap">
                <div className="dashboard-row">
                           <Topbar user={profile} />

                           <div className="notifications-wrapper">
                                      <div className="notifications-wrapper-head">
                                               <h2>All Notifications</h2>
                                               <button>Mark All As Read</button>
                                      </div>

                                      <div className="notifications-row">
                                               { sanitizeNotifications(my_notifications).map(item => 
                                                 <div className="notification-moja" key={item._id}>
                                                         <div className="notification-moja-left">
                                                                  <div className="notification-profile">
                                                                            <img src={item.sender.profilePhoto} alt="" />
                                                                  </div>
                                                                  <div className="notification-texts">
                                                                            { item.notification_type === 'Request' ? <p>{item.sender.senderMsg}</p> : <p>{item.receipient.receipientMsg}</p>}
                                                                            <span>{calculateTimePassed(item.createdAt)}</span>
                                                                  </div>
                                                         </div>
                                                         <div className="notification-moja-right">
                                                                   <button>Mark as Read</button>
                                                         </div>
                                               </div>
                                                )}
                                      </div>
                           </div>
                </div>
    </div>
  )
}

export default NotificationsBody