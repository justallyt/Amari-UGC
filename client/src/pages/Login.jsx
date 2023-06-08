import { NavLink } from "react-router-dom"
import Footer from "../components/Footer"
import logo from "../assets/logo.png"
import LoginUser from "../components/LoginUser"
const Login = () => {

  return (
    <div className="login-wrapper">
             <div className="inner-row">
                       <div className="login-content">
                               <header>
                                       <div className="logo">
                                              <NavLink to={'/'}>
                                                      <img src={logo} alt="App logo" />
                                              </NavLink>
                                       </div>
                                       <div className="header-btns">
                                                <NavLink className="btn outline" to={'/user/register'}>Back</NavLink>
                                       </div>
                                 </header>

                                 <div className="login-user">
                                           <div className="small-intro tweak">
                                                       <h2>Hi, Welcome Back</h2>
                                                       <p>Enter your details to log into your account:</p>
                                           </div>

                                          <div className="account-themselfu">
                                                     <LoginUser />
                                          </div>
                                 </div>
                       </div>
             </div>

             <Footer />
    </div>
  )
}

export default Login