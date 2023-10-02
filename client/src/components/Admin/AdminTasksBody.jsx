import { PiCheck } from "react-icons/pi"
import { LiaTimesSolid } from "react-icons/lia"
import { useSelector } from "react-redux"
import { useApproveCreatorMutation } from "../../redux/admin/adminSlice"
import { useState } from "react"
import TaskInitiator from "./TaskInitiator"
import TaskTarget from "./TaskTarget"
import ApproveBtn from "./ApproveBtn"
import toast, { Toaster } from "react-hot-toast"

const AdminTasksBody = () => {
  const [switchCont, setSwitchCont] = useState(0)
  const [loading, setLoading] = useState(false)

    const { adminRequests } = useSelector(state => state.admin);
    const { approvedRequests } = useSelector(state => state.admin)
    //Approve a Creator
    const [ approveCreator] = useApproveCreatorMutation()

    const approve = async (id) =>{
            setLoading(true)
            try {
                  const res = await approveCreator({id}).unwrap()
                  if(res){
                       toast.success(`${res.message}`, { id: 'Approval Successful'})
                       setLoading(false)
                  }  
            } catch (error) {
                   console.log(error)
            }
    }

    const switchContainers = (id) => {
           setSwitchCont(id)
    }
  return (
    <div className="admin-tasks-body">
               <Toaster />
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
                                                             <p className={switchCont === 0 ? "active" : ''} onClick={() => switchContainers(0)}>New</p>
                                                             <p className={switchCont === 1 ? 'active' : ''} onClick={() => switchContainers(1)}>Approved</p>           
                                                  </div>

                                                   <div className={ switchCont === 0 ? "new-requests active" : "new-requests"}>
                                                             {adminRequests && adminRequests.length > 0 ?
                                                                <div className="requests-list">
                                                                     {  adminRequests.map(item => 
                                                                       <div className="request-moja" key={item._id}>
                                                                                   <TaskInitiator data={item} />
                                                                                   <TaskTarget data={item} />
                                                                                   <div className="additionals-plus-actions">
                                                                                                  <div className="actions">
                                                                                                          
                                                                                                             <ApproveBtn fnClick={approve} load={loading} id={item._id} />
                                                                                                             <button className="reject"><span><LiaTimesSolid /></span> Reject</button>
                                                                                                  </div>

                                                                                                  <div className="recieved-date">
                                                                                                            <p>Received on</p>
                                                                                                            <p>{new Date(item.createdAt).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</p>
                                                                                                  </div>
                                                                                   </div>
                                                                     </div>                                                     
                                                             )}
                                                             </div>
                                                                  :
                                                            <div className="no-listings">
                                                                        <h2>No New Creator Requests</h2>
                                                            </div>
                                                         }
                                                   </div>

                                                   <div className={switchCont === 1 ? "approved-requests active" : "approved-requests"}>
                                                                { approvedRequests && approvedRequests.length > 0  ?
                                                                       <div className="requests-list">
                                                                                 { approvedRequests.map(item => 
                                                                                   <div className="request-moja" key={item._id}>
                                                                                           <TaskInitiator data={item} />
                                                                                           <TaskTarget data={item} />
                                                                                           <div className="additionals-plus-actions">
                                                                                                  <div className="actions">
                                                                                                             <button className="approved"><span><PiCheck /></span> Approved</button>
                                                                                                  </div>

                                                                                                  <div className="recieved-date">
                                                                                                            <p>Updated on</p>
                                                                                                            <p>{new Date(item.updatedAt).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</p>
                                                                                                  </div>
                                                                                   </div>
                                                                     </div>        
                                                                                  
                                                                                   )}
                                                                       </div>
                                                                     :
                                                                     <div className="no-listings">
                                                                               <h2>No Approved Requests</h2>
                                                                     </div>
                                                                 }
                                                   </div>
                                      </div>
                          </div>
              </div>
    </div>
  )
}

export default AdminTasksBody