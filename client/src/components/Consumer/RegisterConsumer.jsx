import { VscEye, VscEyeClosed } from "react-icons/vsc"
import Footer from "../../components/Footer"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const RegisterConsumer = () => {
   const [ status, setStatus] = useState(false);

   const changeStatus = () =>{
         setStatus(!status);
   }
  return (
    <div className="register-brand">
               <div className="small-intro tweak">
                         <h2>Register Your Company</h2>
                         <p>Enter your details to create your account:</p>
               </div>

               <div className="form">
                        <form>
                                 <div className="form-row">
                                           <label htmlFor="name">Full Name <span>*</span></label>
                                           <input type="text" placeholder="Abigail Bundi" className="form-control" />
                                  </div>
                                  <div className="form-row">
                                           <label htmlFor="email">Email Address <span>*</span></label>
                                           <input type="email" placeholder="abby@email.com" className="form-control" />
                                  </div>
                                  <div className="form-row">
                                          <label htmlFor="password">Password <span>*</span></label>
                                          <div className="password-input">
                                                   <input type={ status ? "text" : "password"} placeholder="Strong Password" className="form-control" />
                                                   <div className={ status ? "toggle-btn active" : "toggle-btn"} onClick={changeStatus}>
                                                            <span><VscEye /></span>
                                                            <span className="yes"><VscEyeClosed /></span>
                                                   </div>
                                          </div>
                                  </div>

                                  <div className="agreement">
                                            <input type="checkbox" className="check" />
                                            <p>I agree to the <a href="s">Terms of Service</a> and <a href="s">Privacy Policy</a></p>
                                  </div>

                                  <button type="submit" className="btn-submit">Create Account</button>
                        </form>

                        <p className="redirect">Already have an account? <NavLink to="/user/login">Login</NavLink></p>
               </div>

               <Footer />
    </div>
  )
}

export default RegisterConsumer