import { useParams, NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import RegisterBrand from "../components/Brand/RegisterBrand"
import RegisterConsumer from "../components/Consumer/RegisterCreator"
//import Footer from "../components/Footer"
const Register = () => {
    const { type } = useParams()

  return (
    <div className="register-wrapper">
             <div className="inner-row">
                       <div className="register-content">
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

                                 <div className="create-account-body">
                                           { type === 'brand' ? 
                                                 <RegisterBrand />
                                                :
                                                type === 'creator' ?
                                                    <RegisterConsumer />
                                                :
                                                <p>Please select an option to register either as a brand or consumer. Thanks</p>
                                            }
                                 </div>
                       </div>

             </div>
    </div>
  )
}

export default Register