import { CgClose } from "react-icons/cg"
import { useSelector } from "react-redux";
import { calculateTimePassed, sanitizeNotifications } from "../../utils/dateConverter";
import { NavLink } from "react-router-dom";

const NotificationFlyBox = ({ status, fn, innerRef }) => {
   const closeNotificationBox = () => fn(false);
   const { profile, all_notifications } = useSelector(state => state.profile);

  return (
     <div className={ status ? "notification-fly-box active" : "notification-fly-box"} ref={innerRef}>
            <div className="box-header">
                       <h3>Notifications</h3>
                       <span onClick={closeNotificationBox}><CgClose /></span>
            </div>
             <div className="box-body">
                         { all_notifications && all_notifications.length > 0 ? 
                               sanitizeNotifications(all_notifications).slice(0, 4).map(item => 
                                <div className="box-notification-moja" key={item._id}>
                                             <div className="box-profile">
                                                    { item.notification_type === 'Approval' ? 
                                                             <span className="approval">A</span> 
                                                       : item.notification_type === 'Request' ?
                                                             <span className="request">R</span>
                                                        : item.notification_type === 'Upload' ?
                                                        <span className="upload">U</span>
                                                        :  item.notification_type === 'Reward' ?
                                                             <span className="reward">R</span>
                                                        : 
                                                         <span>N</span>
                                                     }
                                            </div>
                                            <div className="box-texts">
                                                   { item.notification_type === 'Request' ? <p className={item.sender.isRead ? 'read' : ''}>{item.sender.senderMsg}</p> : 
                                                      item.notification_type === 'Upload' ?  <p className={item.sender.isRead ? 'read' : ''}>{item.sender.senderMsg}</p> :
                                                      item.notification_type === 'Reward' ?  <p className={item.sender.isRead ? 'read' : ''}>{item.sender.senderMsg}</p> :
                                                      <p className={item.sender.isRead ? 'read' : ''}>{item.receipient.receipientMsg}</p>}
                                                      
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