import Extras from "./Extras"
import Informationals from "./Informationals"
import Topbar from "./Topbar"
import Footer from '../Footer'

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
                                               <Extras />
                                  </div>
                         </div>

                         <Footer />
               </div>
    </div>
  )
}

export default DashboardBody