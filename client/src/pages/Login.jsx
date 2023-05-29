import { NavLink } from "react-router-dom"
import Footer from "../components/Footer"
import logo from "../assets/logo.png"
import { useState } from "react"
import LoginBrand from "../components/Brand/LoginBrand"
import LoginConsumer from "../components/Consumer/LoginConsumer"
const Login = () => {
    const [active, setActive] = useState(0)

    const changeActive = (i) => {
           setActive(i);
    }
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
                                                       <p>Please choose your account and enter your details to log in:</p>
                                           </div>

                                           <div className="account-options">
                                                  <p className={ active === 0 ? "active" : ""} onClick={() => changeActive(0)}>Login as a Brand</p>
                                                  <p className={ active === 1 ? "active" : ""} onClick={() => changeActive(1)}>Login as a Consumer</p>
                                           </div>

                                          <div className="account-themselfu">
                                                    { active === 0 ? 
                                                         <LoginBrand />
                                                         :
                                                         <LoginConsumer /> 
                                                     }
                                          </div>
                                 </div>
                       </div>
             </div>

             <Footer />
    </div>
  )
}

export default Login