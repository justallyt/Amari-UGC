import Extras from "./Extras"
import Informationals from "./Informationals"
import Topbar from "./Topbar"
import Footer from '../Footer'
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { clearMessage } from "../../redux/authSlice"
const DashboardBody = () => {

  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  
  useEffect(() => {
        if(userInfo && userInfo.message){
               toast.success(userInfo.message, {
                      id: 'success'
               });
               setTimeout(()=> {
                      dispatch(clearMessage());
              }, 3000)
        }
  }, [userInfo, dispatch])
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