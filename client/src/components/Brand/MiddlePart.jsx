import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux"
import { clearMessage } from "../../redux/authSlice"
import creators from "../../assets/leader.png";
import videos from "../../assets/photograph.png"
import posts from "../../assets/social-media.png"
import { RxTriangleUp } from "react-icons/rx"
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//Dummy data for creations
const wedges = [
  { id: 0, icon: creators, num: 20, txt: 'Creators for my brand'},
  { id: 1, icon: videos, num: 50, txt: 'Videos for my brand'},
  { id: 2, icon: posts, num: 33, txt: 'Posts Made'}
]

//Dummy data for bar chart
const data = [
     {
         name: 'July 1 - 31',
         uv: 25,
         pv: 10,
         amt: 40,
     },
     {
      name: 'Aug 1 - 31',
      uv: 30,
      pv: 58,
      amt: 40,
    },
    {
      name: 'Sep 1 - 30',
      uv: 20,
      pv: 38,
      amt: 29,
    },
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

                                       <div className="performance-analytics">
                                                <h3>Performance</h3>
                                                <div className="performance-grid-wrap">
                                                            <div className="performance-numbers">
                                                                         <h4>Total Impressions</h4>
                                                                         <p>Last 90 days</p>

                                                                         <h1>100k <span><RxTriangleUp className="icon" />+ 5.4%</span></h1>
                                                                         <p><span>+ 9.3k </span>vs prev 60 days</p>
                                                            </div>
                                                            <div className="performance-bar-chart">
                                                            <ResponsiveContainer width="100%" height="100%">
                                                                            <BarChart
                                                                                    data={data}
                                                                                   
                                                                              >
                                                                                     <CartesianGrid strokeDasharray="3 3" />
                                                                                                 <XAxis dataKey="name" axisLine={false}/>
                                                                                                 <YAxis axisLine={false} />
                                                                                                 <Tooltip />
                                                                                                 <Legend />
                                                                                                 <Bar dataKey="pv" fill="#8884d8" />
                                                                                                 <Bar dataKey="uv" fill="#82ca9d" />
                                                                              </BarChart>
                                                                       </ResponsiveContainer>
                                                            </div>
                                                </div>
                                       </div>
                          </div>
                 </div>
    </div>
  )
}

export default MiddlePart