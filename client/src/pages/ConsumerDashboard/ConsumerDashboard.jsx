import ConsumerSidebar from "../../components/Consumer/Sidebar"
import "../../css/consumer/dashboard.css"
const ConsumerDashboard = () => {
  return (
    <>
        <div className="dashboard-wrapper">
                 <div className="dashboard-inner">
                          <ConsumerSidebar />
                 </div>
        </div>
    </>
  )
}

export default ConsumerDashboard