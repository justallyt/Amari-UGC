import Informationals from "./Informationals"
import Topbar from "./Topbar"

const DashboardBody = () => {
  return (
    <div className="dashboard-body-wrap">
               <div className="dashboard-row">
                         <Topbar />

                         <div className="dashbord-wrapper">
                                  <div className="intro">
                                            <h2>Hi, Abigail</h2>
                                  </div>
                                  <div className="dashboard-wrapper-row">
                                               <Informationals />
                                  </div>
                         </div>
               </div>
    </div>
  )
}

export default DashboardBody