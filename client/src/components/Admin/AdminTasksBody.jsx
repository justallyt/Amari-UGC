import { PiCheck } from "react-icons/pi"
import { LiaTimesSolid } from "react-icons/lia"
import dummy1 from "../../assets/creator2.jpg"
import dummy2 from "../../assets/stanchart.png"
const AdminTasksBody = () => {
  return (
    <div className="admin-tasks-body">
              <div className="admin-inner">
                          <div className="tasks-body-content">
                                      <h2>Tasks Management</h2>
                                      <div className="tasks-header">
                                                <ul>
                                                         <li className="active">Creator Requests</li>
                                                         <li>Brand Requests</li>
                                                </ul>
                                      </div>

                                      <div className="creator-requests">
                                                  <div className="requests-status">
                                                             <p className="active">New</p>
                                                             <p>Approved</p>           
                                                  </div>

                                                  <div className="requests-list">
                                                              <div className="request-moja">
                                                                            <div className="initiator">
                                                                                       <h3>Initiator</h3>
                                                                                        <div className="initiator-profile">
                                                                                                   <div className="profile-image">
                                                                                                            <img src={dummy1} alt="" />
                                                                                                   </div>
                                                                                                    <div className="profile-description">
                                                                                                              <h2>Omondi Fullstack Dev</h2>
                                                                                                              <h5>Creator</h5>
                                                                                                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel nam nihil molestiae id at illum, eaque repudiandae quas neque eveniet.</p>
                                                                                                              <button>View Creator</button>
                                                                                                    </div>
                                                                                        </div>
                                                                            </div>
                                                                            <div className="target">
                                                                                         <h3>Target</h3>
                                                                                         <div className="target-profile">
                                                                                                    <div className="profile-image">
                                                                                                              <img src={dummy2} alt="" />
                                                                                                    </div>
                                                                                                    <div className="profile-description">
                                                                                                                 <h2>Standard Chartered</h2>
                                                                                                                 <h5>Consulting</h5>
                                                                                                    </div>
                                                                                         </div>
                                                                            </div>
                                                                            <div className="additionals-plus-actions">
                                                                                           <div className="actions">
                                                                                                      <button className="approve"><span><PiCheck /></span> Approve</button>
                                                                                                      <button className="reject"><span><LiaTimesSolid /></span> Reject</button>
                                                                                           </div>

                                                                                           <div className="recieved-date">
                                                                                                     <p>Received on</p>
                                                                                                     <p>sep 24, 2023 11.10 am</p>
                                                                                           </div>
                                                                            </div>
                                                              </div>
                                                  </div>
                                      </div>
                          </div>
              </div>
    </div>
  )
}

export default AdminTasksBody