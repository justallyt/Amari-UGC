
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
                                      </div>
                          </div>
              </div>
    </div>
  )
}

export default AdminTasksBody