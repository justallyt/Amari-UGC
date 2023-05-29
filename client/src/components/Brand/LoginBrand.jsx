import { useState } from "react"
import { VscEye } from "react-icons/vsc"
import { VscEyeClosed } from "react-icons/vsc"
import { NavLink } from "react-router-dom"
const LoginBrand = () => {
  const [ status, setStatus] = useState(false);

  const changeStatus = () =>{
        setStatus(!status);
  }
  return (
    <div className="brand-form">
             <form action="">
                     <div className="form-row">
                               <label htmlFor="email">Organization Email <span>*</span></label>
                               <input type="email" className="form-control" placeholder="Organization Email" />
                     </div>
                     <div className="form-row">
                               <label htmlFor="password">Organization Password <span>*</span></label>
                               <div className="password-input">
                                         <input type={ status ? "text" : "password"} placeholder="Strong Password" className="form-control" />
                                         <div className={ status ? "toggle-btn active" : "toggle-btn"} onClick={changeStatus}>
                                                  <span><VscEye /></span>
                                                  <span className="yes"><VscEyeClosed /></span>
                                         </div>
                                </div>
                     </div>

                     <button type="submit" className="btn-submit">Log in</button>
             </form>

             <p className="redirect">Do not have an account? <NavLink to="/user/register">Create One</NavLink></p>
    </div>
  )
}

export default LoginBrand