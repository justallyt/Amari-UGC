import Extras from "./Extras"
import Informationals from "./Informationals"
import Topbar from "./Topbar"
import Footer from '../Footer'
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { clearMessage } from "../../redux/authSlice"
const DashboardBody = () => {
  const [ greeting, setGreeting ] = useState('')
  const { userInfo } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  
  useEffect(() => {
           const time = new Date().getHours();
           
           time >= 6 && time < 12 ? setGreeting("Good Morning") :
           time >= 12 && time < 17 ? setGreeting("Good Afternoon") :
           time >= 17 && time < 22 ? setGreeting("Good Evening") :
           setGreeting('Hi');

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
                         <Topbar user={profile} />

                         <div className="dashboard-wrapper">
                                  <div className="intro">
                                            <h2>{greeting}, { profile && profile.name.split(" ")[0]}</h2>
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