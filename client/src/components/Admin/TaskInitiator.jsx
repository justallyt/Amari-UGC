import { useSelector } from "react-redux"

const TaskInitiator = ({ data }) => {
   const { allCreators } = useSelector(state => state.admin);
   const initiator = allCreators.find(item => item._id === data.creator)
  return (
    <div className="initiator">
         <h3>Initiator</h3>
         <div className="initiator-profile">
                <div className="profile-image">
                         <img src={initiator.profilePic.url} alt="" />
                </div>
                 <div className="profile-description">
                           <h2>{initiator.name}</h2>
                           <h5>Creator</h5>
                           <p>{data.message}</p>
                           <button>View Creator</button>
                 </div>
     </div>
</div>
  )
}

export default TaskInitiator