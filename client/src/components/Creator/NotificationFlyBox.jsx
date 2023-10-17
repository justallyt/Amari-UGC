import { CgClose } from "react-icons/cg"
import { useSelector } from "react-redux";
import { calculateTimePassed, sanitizeNotifications } from "../../utils/dateConverter";
import { NavLink } from "react-router-dom";

const NotificationFlyBox = ({ status, fn, innerRef }) => {
   const closeNotificationBox = () => fn(false);
   const { profile, unread_notifications } = useSelector(state => state.profile);

  return (
     <div className={ status ? "notification-fly-box active" : "notification-fly-box"} ref={innerRef}>
            <div className="box-header">
                       <h3>Notifications</h3>
                       <span onClick={closeNotificationBox}><CgClose /></span>
            </div>
             <div className="box-body">
                         { unread_notifications && unread_notifications.length > 0 ? 
                               sanitizeNotifications(unread_notifications).map(item => 
                                <div className="box-notification-moja" key={item._id}>
                                             <div className="box-profile">
                                                    { item.notification_type === 'Approval' ? 
                                                             <span className="approval">A</span> 
                                                       : item.notification_type === 'Request' ?
                                                             <span className="request">R</span>
                                                        : <span>N</span>
                                                     }
                                            </div>
                                            <div className="box-texts">
                                                   { item.notification_type === 'Request' ? <p>{item.sender.senderMsg}</p> : <p>{item.receipient.receipientMsg}</p>}
                                                  <span>{calculateTimePassed(item.createdAt)}</span>
                                           </div>
                              </div>
                                )
                            :
                            <p className="caught-up">You&apos;re all caught up on your notifications.</p>
                         }

                         <NavLink to={`/creator/${profile.username !=='null' ? profile.username : profile._id}/notifications`}>View All Notifications</NavLink>
             </div>
    </div>
  )
}

export default NotificationFlyBox