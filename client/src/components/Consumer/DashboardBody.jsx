import Extras from "./Extras"
import Informationals from "./Informationals"
import Topbar from "./Topbar"
import Footer from '../Footer'
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react"
const DashboardBody = () => {

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
        if(userInfo){
               toast.success(userInfo.message);
        }
  }, [userInfo])
  return (
    <div className="dashboard-body-wrap">
                  <Toaster />
               <div className="dashboard-row">
                         <Topbar />

                         <div className="dashbord-wrapper">
                                  <div className="intro">
                                            <h2>Hi, { userInfo && userInfo.name.split(" ")[0]}</h2>
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