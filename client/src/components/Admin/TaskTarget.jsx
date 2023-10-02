import { useSelector } from "react-redux"

const TaskTarget = ({ data }) => {
    const { allBrands } = useSelector(state => state.admin)
    
    const target = allBrands !== null ? allBrands.find(item => item._id === data.brand) : []
  return (
    <div className="target">
         <h3>Target</h3>
         { target ? 
                <div className="target-profile">
                         <div className="profile-image">
                                   <img src={target.profilePic.url} alt="" />
                         </div>
                         <div className="profile-description">
                                      <h2>{target.name}</h2>
                                      <h5>Consulting</h5>
                         </div>
              </div> : 'Nothing to show'
          }
  </div>
  )
}

export default TaskTarget