
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
                                                                                                            <img src="" alt="" />
                                                                                                   </div>
                                                                                                    <div className="profile-description">
                                                                                                              <h2>Omondi Fullstack Dev</h2>
                                                                                                              <h5>Creator</h5>
                                                                                                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel nam nihil molestiae id at illum, eaque repudiandae quas neque eveniet.</p>
                                                                                                    </div>
                                                                                        </div>
                                                                            </div>
                                                                            <div className="target">
                                                                                         <h3>Target</h3>
                                                                                         <div className="target-profile">
                                                                                                    <div className="profile-image">
                                                                                                              <img src="" alt="" />
                                                                                                    </div>
                                                                                                    <div className="profile-description">
                                                                                                                 <h2>Standard Chartered</h2>
                                                                                                                 <h5>Consulting</h5>
                                                                                                    </div>
                                                                                         </div>
                                                                            </div>
                                                                            <div className="actions">
                                                                                       <button></button>
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