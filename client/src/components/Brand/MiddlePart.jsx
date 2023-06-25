import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux"
import { clearMessage } from "../../redux/authSlice"
import creators from "../../assets/leader.png";
import videos from "../../assets/photograph.png"
import posts from "../../assets/social-media.png"

const wedges = [
  { id: 0, icon: creators, num: 20, txt: 'Creators for my brand'},
  { id: 1, icon: videos, num: 50, txt: 'Videos for my brand'},
  { id: 2, icon: posts, num: 33, txt: 'Posts Made'}
]
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
                                                 <h3>{greeting}, {profile.name} </h3>
                                                 <p>Have an in-depth look at all the metrics within your dashboard</p>
                                       </div>

                                       <div className="statistics-wedge">
                                                 { wedges.map(item => 
                                                   <div className="wedge-moja" key={item.id}>
                                                           <div className="wedge-icon">
                                                                   <img src={item.icon} alt="" />
                                                          </div>
                                                          <div className="wedge-texts">
                                                                 <h4>{item.num}</h4>
                                                                 <h5>{item.txt}</h5>
                                                           </div>
                                                  </div>
                                                  )}
                                              
                                       </div>
                          </div>
                 </div>
    </div>
  )
}

export default MiddlePart