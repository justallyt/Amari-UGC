import ProfileBody from "../../components/Consumer/ProfileBody"
import ConsumerSidebar from "../../components/Consumer/Sidebar"
import "../../css/consumer/profile.css"
const Profile = () => {
  return (
    <div className="dashboard-wrapper">
               <div className="dashboard-inner">
                       <ConsumerSidebar />
                       <ProfileBody />
               </div>
    </div>
  )
}

export default Profile