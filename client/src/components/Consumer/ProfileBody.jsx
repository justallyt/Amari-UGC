import { NavLink } from "react-router-dom"
import Topbar from "./Topbar"
import { BsArrowLeft } from "react-icons/bs"
const ProfileBody = () => {
  return (
    <div className="dashboard-body-wrap">
               <div className="dashboard-row">
                            <Topbar />

                            <div className="profile-wrapper">
                                       <div className="profile-header">
                                                   <NavLink to={'/consumer/dashboard'}>
                                                             <span><BsArrowLeft /></span>
                                                   </NavLink>
                                                  <h2>Account Settings</h2>
                                       </div>

                                       <div className="profile-stuff-row">
                                                  <div className="profile-form">
                                                              <div className="intro">
                                                                        <h3>User Information</h3>
                                                                        <p>Here you can edit public information about yourself. The changes will be displayed for other users after saving.</p>
                                                              </div>
                                                              <form>
                                                                        <div className="profile-form-row">
                                                                                   <label htmlFor="Full name">Full Name</label>
                                                                                   <input type="text" className="input-control" placeholder="Sasha Amondi" />
                                                                        </div>
                                                                        <div className="profile-form-row">
                                                                                   <label htmlFor="Full name">Email</label>
                                                                                   <input type="email" className="input-control" placeholder="sasha@horunda.org" />
                                                                        </div>
                                                                        <div className="profile-form-row split">
                                                                                    <div className="profile-form-column">
                                                                                             <label htmlFor="country">Country</label>
                                                                                             <input type="text" className="input-control" placeholder="Kenya" />
                                                                                    </div>
                                                                                    
                                                                        </div>
                                                              </form>
                                                  </div>
                                                  <div className="picture-side">

                                                  </div>
                                       </div>
                            </div>
               </div>
    </div>
  )
}

export default ProfileBody