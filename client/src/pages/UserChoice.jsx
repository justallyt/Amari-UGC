import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom"
import { HiOutlineBuildingOffice2 } from "react-icons/hi2"
import { IoPersonAddOutline } from "react-icons/io5"
import { RxCircle, RxCheckCircled } from "react-icons/rx"
import { useState } from "react"
import Footer from "../components/Footer"

const UserChoice = () => {
    const [selected, setSelected] = useState("")

    const switchType = (i) =>{
        if(selected === i){
              setSelected(null)
        }
        setSelected(i)
  }
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
                                                <NavLink className="btn outline" to={'/'}>Home</NavLink>
                                       </div>
                                 </header>

                              <div className="registration-body-content">
                                        <div className="small-intro">
                                                 <h2>Create Your Account</h2>
                                                 <p>The digital space offers great opportunities for creators to review different products to exponential grow, various brands marketing campaigns. Create an account below to get started.</p>
                                        </div>

                                        <div className="choice-row">
                                                  <div className={ selected === 0 ? "choice-moja selected" : "choice-moja"} onClick={() =>switchType(0)}>
                                                           <div className="choice-icon">
                                                                    <span><HiOutlineBuildingOffice2 /></span>
                                                           </div>
                                                           <div className="choice-text">
                                                                    <h3>I am a Company</h3>
                                                                    <p>Get first class user reviews from the products you produce</p>
                                                           </div>
                                                           <div className="choice-toggles">
                                                                      <span><RxCircle  /></span>
                                                                      <span className="yes"><RxCheckCircled /></span>
                                                           </div>
                                                  </div>

                                                  <div className={ selected === 1 ? "choice-moja selected" : "choice-moja" }  onClick={() => switchType(1)}>
                                                           <div className="choice-icon">
                                                                    <span><IoPersonAddOutline /></span>
                                                           </div>
                                                           <div className="choice-text">
                                                                    <h3>I am a Content Creator</h3>
                                                                    <p>Earn money giving reviews to various products that you use.</p>
                                                           </div>
                                                           <div className="choice-toggles">
                                                                      <span><RxCircle  /></span>
                                                                      <span className="yes"><RxCheckCircled /></span>
                                                           </div>
                                                  </div>

                                                  <div className="choice-btn">
                                                          <NavLink className={ selected === '' ? "btn expand inactive" : "btn background expand"} to={selected === 0 ? '/user/register/brand' : '/user/register/creator'}>Continue</NavLink>
                                                  </div>
                                        </div>
                              </div>
                        </div>

                        <Footer />
             </div>
    </div>
  )
}

export default UserChoice