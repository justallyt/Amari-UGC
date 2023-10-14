import { CgClose } from "react-icons/cg"
import { useSelector } from "react-redux";
import { calculateTimePassed } from "../../utils/dateConverter";
const NotificationFlyBox = ({ status, fn }) => {
   const closeNotificationBox = () => fn(false);
   const { my_notifications } = useSelector(state => state.profile);

  return (
     <div className={ status ? "notification-fly-box active" : "notification-fly-box"}>
            <div className="box-header">
                       <h3>Notifications</h3>
                       <span onClick={closeNotificationBox}><CgClose /></span>
            </div>
             <div className="box-body">
                         { my_notifications && my_notifications.length > 0 ? 
                               my_notifications.map(item => 
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
                                                  <p>{item.receipient.receipientMsg}</p>
                                                  <span>{calculateTimePassed(item.createdAt)}</span>
                                           </div>
                              </div>
                                )
                            :
                            <p>You&apos;re all caught up on your notifications.</p>
                         }
             </div>
    </div>
  )
}

export default NotificationFlyBox