import DashboardBody from "../../components/Consumer/DashboardBody"
import ConsumerSidebar from "../../components/Consumer/Sidebar"
import "../../css/consumer/dashboard.css"
import { useDispatch, useSelector } from "react-redux"
//import { useGetUserProfileMutation } from "../../redux/apiSlice"
import { setProfile } from "../../redux/profileSlice"
const ConsumerDashboard = () => {
  const { profile } = useSelector(state => state.profile);
  
  const dispatch = useDispatch();
  //Get User Profile
  //const [ getUser ] = useGetUserProfileMutation()
  // try {
  //      const res = getUser().unwrap();
  //      dispatch(setProfile({...res}))
  // } catch (error) {
  //      console.log(error);
  // }
  return (
    <>
        <div className="dashboard-wrapper">
                 <div className="dashboard-inner">
                          <ConsumerSidebar />
                          <DashboardBody />
                 </div>
        </div>
    </>
  )
}

export default ConsumerDashboard