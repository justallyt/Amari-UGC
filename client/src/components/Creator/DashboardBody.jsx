import Extras from "./Extras"
import Informationals from "./Informationals"
import Topbar from "./Topbar"
import Footer from '../Footer'
import { useSelector } from "react-redux"
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { clearMessage } from "../../redux/authSlice"
import { useNavigate } from "react-router-dom"
import discover from "../../assets/rocket.png"
import moments from "../../assets/live-streaming.png"
import loyalty from "../../assets/loyalty.png"

const DashboardBody = () => {
  const [ greeting, setGreeting ] = useState('')
  const { userInfo } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate();
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
                                            <div className="intro-box wrap">
                                                      <div className="intro-box-texts">
                                                                 <h2>{greeting}, { profile && profile.name.split(" ")[0]}</h2>
                                                                 {/* <p>Welcome to Amari, Where your voice shapes the brands you love.</p> */}
                                                                 <p>Welcome to Amari. Where your loyalty to Brands gets rewarded!</p>
                                                      </div>
                                                     <div className="intro-box-row">
                                                               <div className="intro-box-column" onClick={() => navigate(`/creator/${profile.username !== 'null' ? profile.username : profile._id}/my-brands`)}>
                                                                          <div className="intro-top">
                                                                                    <div className="icon">
                                                                                             <img src={discover} alt="" />
                                                                                    </div>
                                                                                    <h3>Discover your Favorites Brands</h3>
                                                                          </div>
                                                                          <div className="box-column-texts">
                                                                                      {/* <p>Explore and connect with a wide array of brands, finding new favorites and rekindling love for the classics.</p> */}
                                                                          </div>
                                                               </div>
                                                               <div className="intro-box-column" onClick={() => navigate(`/creator/${profile.username !== 'null' ? profile.username : profile._id}/moments`)}>
                                                                          <div className="intro-top">
                                                                                    <div className="icon">
                                                                                             <img src={moments} alt="" />
                                                                                    </div>
                                                                                    <h3>Share your Brand moments</h3>
                                                                          </div>
                                                                          <div className="box-column-texts">
                                                                                      {/* <p>Your experiences are invaluable. Upload photos or videos of you using your favorite products and let your voice be heard.</p> */}
                                                                          </div>
                                                               </div>
                                                     </div>
                                            </div>
                                            <div className="community-box">
                                                         <div className="box-inner">
                                                                    <img src={loyalty} alt="" />
                                                                   <h3>Earn Loyalty Rewards</h3>
                                                                   <p>Your contributions deserve recognition. Get loyalty rewards, exclusive discounts, and special promotions, celebrating your engagement and loyalty.</p>
                                                                   {/* <Link to=><span><FiPlus /></span>Find your Brand</Link> */}
                                                         </div>
                                            </div>
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