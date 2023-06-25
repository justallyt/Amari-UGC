import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux"
import { clearMessage } from "../../redux/authSlice"

const MiddlePart = () => {
    const [ greeting, setGreeting] = useState('')

    const { userInfo } = useSelector(state => state.auth);
    const { profile } = useSelector(state => state.profile)
    const dispatch = useDispatch()

    useEffect(()=>{
           const time = new Date().getHours();
           
           time > 6 && time < 12 ? setGreeting("Good Morning") :
           time > 12 && time < 17 ? setGreeting("Good Afternoon") :
           time > 17 && time < 22 ? setGreeting("Good Evening") :
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
    <div className="dashboard-middle-part">
               <Toaster />
                 <div className="wrapper-inner">
                          <div className="middle-part-content">
                                       <div className="greeting">
                                                 <h3>{greeting}, </h3>
                                       </div>
                          </div>
                 </div>
    </div>
  )
}

export default MiddlePart