import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import "../css/welcome.css"
import random1 from "../assets/reviewer1.jpg"
import random2 from "../assets/reviewer2.jpg"
import random3 from "../assets/reviewer3.jpg"
import random4 from "../assets/reviewer4.jpg"
import random5 from '../assets/review5.jpg'
import random6 from "../assets/reviewer6.jpg"
import random7 from "../assets/reviewer7.jpg"

const Home = () => {
  return (
    <div className="welcome-wrapper">
           <div className="inner-row">
                     <div className="welcome-content">
                              <header>
                                       <div className="logo">
                                              <NavLink to={'/'}>
                                                      <img src={logo} alt="App logo" />
                                              </NavLink>
                                       </div>
                                       <div className="header-btns">
                                                <NavLink className="btn outline" to={'/user/login'}>Login</NavLink>
                                                <NavLink className="btn background" to={'/user/register'}>Sign Up</NavLink>
                                       </div>
                              </header>

                              <div className="welcome-intro">
                                         <div className="welcome-intro-texts">
                                                   <h1>A Platform Connecting brands with their consumers</h1>
                                                   <div className="get-started">
                                                              <NavLink className="btn background expand" to={'/user/register/creator'}>Get Started As a Creator</NavLink>
                                                              <NavLink className="btn outline expand" to={'/user/register/brand'}>Get Started As a Brand</NavLink>
                                                   </div>
                                         </div>
                              </div>
                     </div>
           </div>
           <div className="random-images-section">
                     <div className="random-images-row">
                              <div className="random-column flexate">
                                     <img className="tiny" src={random1} alt="" />
                             </div>
                             <div className="random-column flexate">
                                       <img className="tiny" src={random2} alt="" />
                                      <img className="tiny" src={random3} alt="" />
                             </div>
                             <div className="random-column">
                                       <img className="large" src={random4} alt="" />
                             </div>
                              <div className="random-column flexate">
                                       <img className="tiny" src={random5} alt="" />
                                       <img className="tiny" src={random6} alt="" />
                              </div>
                              <div className="random-column flexate">
                                       <img className="tiny" src={random7} alt="" />   
                              </div>  
                     </div>   
            </div>
            <div className="footer">
                     <p>Copyright &copy; { new Date().getFullYear() } Amari | All rights Reserved</p>
            </div>
    </div>
  )
}

export default Home