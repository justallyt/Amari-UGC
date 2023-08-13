import { PiCheck } from "react-icons/pi"
import { LiaTimesSolid } from "react-icons/lia"
import { useDispatch, useSelector } from "react-redux"
import { useApproveCreatorMutation, useGetAllBrandsQuery, useGetAllCreatorsQuery, useGetApprovedCreatorsQuery } from "../../redux/admin/adminSlice"
import { useEffect, useState } from "react"
import { setAllBrandsForAdmin, setAllCreatorsForAdmin, setApprovedRequests } from "../../redux/admin/adminUtils"
import TaskInitiator from "./TaskInitiator"
import TaskTarget from "./TaskTarget"
import CogSpinner from "../CogSpinner"
const AdminTasksBody = () => {
  const [switchCont, setSwitchCont] = useState(0)
    const dispatch = useDispatch();

    const { data: brands } = useGetAllBrandsQuery({  refetchOnMountOrArgChange: true })
    const { data: creators } = useGetAllCreatorsQuery({  refetchOnMountOrArgChange: true })
    const { data: approved } = useGetApprovedCreatorsQuery({ refetchOnMountOrArgChange: true});

    useEffect(() => {
               if(brands) dispatch(setAllBrandsForAdmin([...brands.all_brands]))
               if(creators) dispatch(setAllCreatorsForAdmin([...creators.all_creators]))
               if(approved) dispatch(setApprovedRequests([...approved.requests]))
    }, [brands, creators,approved, dispatch])

    const { adminRequests } = useSelector(state => state.admin);
    const { approvedRequests } = useSelector(state => state.admin)
    //Approve a Creator
    const [ approveCreator, { isLoading }] = useApproveCreatorMutation()

    const approve = async (id) =>{
            try {
                  const res = await approveCreator({id}).unwrap()

                  console.log(res)
            } catch (error) {
                   console.log(error)
            }
    }

    const switchContainers = (id) => {
           setSwitchCont(id)
    }
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
                                                                                                             <button onClick={() => approve(item._id)} className="approve">{ isLoading ? <CogSpinner />   : <span><PiCheck /></span> } Approve </button>
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