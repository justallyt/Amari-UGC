import { PiCheck } from "react-icons/pi"
import { LiaTimesSolid } from "react-icons/lia"
import { useDispatch, useSelector } from "react-redux"
import { useApproveCreatorMutation, useGetAllBrandsQuery, useGetAllCreatorsQuery } from "../../redux/admin/adminSlice"
import { useEffect } from "react"
import { setAllBrandsForAdmin, setAllCreatorsForAdmin } from "../../redux/admin/adminUtils"
import TaskInitiator from "./TaskInitiator"
import TaskTarget from "./TaskTarget"
const AdminTasksBody = () => {
    const dispatch = useDispatch();

    const { data: brands } = useGetAllBrandsQuery({  refetchOnMountOrArgChange: true })
    const { data: creators } = useGetAllCreatorsQuery({  refetchOnMountOrArgChange: true })

    useEffect(() => {
               if(brands) dispatch(setAllBrandsForAdmin([...brands.all_brands]))
               if(creators) dispatch(setAllCreatorsForAdmin([...creators.all_creators]))
    }, [brands, creators, dispatch])

    const { adminRequests } = useSelector(state => state.admin);
    
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
                                                              { adminRequests && adminRequests.map(item => 
                                                                <div className="request-moja" key={item._id}>
                                                                            <TaskInitiator data={item} />
                                                                            <TaskTarget data={item} />
                                                                            <div className="additionals-plus-actions">
                                                                                           <div className="actions">
                                                                                                      <button onClick={() => approve(item._id)} className="approve"><span><PiCheck /></span> Approve</button>
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
                                      </div>
                          </div>
              </div>
    </div>
  )
}

export default AdminTasksBody