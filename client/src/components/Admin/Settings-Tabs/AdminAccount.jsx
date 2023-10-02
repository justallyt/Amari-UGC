import { useState } from "react"
import profile_dummy from "../../../assets/vid1.jpg"
import { BsEyeSlash, BsEye } from "react-icons/bs"
const AdminAccount = () => {
  const [ view, setView] = useState(false)
  return (
    <div className="account-wrapper">
                <form>
                     <div className="wrapper-split">
                            <div className="profile-row">
                                      <h3>Change Profile</h3>
                                      <p>Change your profile picture from here</p>

                                      <div className="upload-profile-box">
                                                  <div className="upload-image">
                                                             <img src={profile_dummy} alt="" />
                                                  </div>
                                                  <div className="upload-btns">
                                                             <button>Upload</button>
                                                             <button>Reset</button>
                                                  </div>
                                      </div>
                                      <p className="profile-terms">Allowed jpg,jpeg or png. Max size of 800Kb</p>
                            </div>
                            <div className="password-row">
                                           <h3>Change your Password</h3>
                                           <p>To change your password please confirm here</p>
                                             
                                             <div className="password-check" onClick={() => setView(!view)}>
                                                        <div className="password-btns">
                                                                { view ? <span><BsEye /></span> : <span><BsEyeSlash /></span>}
                                                        </div>
                                             </div>
                                           <div className="password-form">
                                                      <div className="input-row">
                                                                 <label htmlFor="current-password">Current Password</label>
                                                                 <input type={view ? "text" : "password"} className="input-control" value="1234500"  />
                                                      </div>
                                                      <div className="input-row">
                                                                 <label htmlFor="current-password">New Password</label>
                                                                 <input type={view ? "text" : "password"} className="input-control" value="1234500"   />
                                                      </div>
                                                      <div className="input-row">
                                                                 <label htmlFor="current-password">Confirm Password</label>
                                                                 <input type={view ? "text" : "password"} className="input-control" value="1234500"   />
                                                      </div>
                                           </div>
                            </div>
                     </div>

                    <div className="personal-details-row">
                              <h3>Personal Details</h3>
                              <p>To change your personal details, edit and save from here</p>

                              <div className="personal-details-grid">
                                         <div className="input-row">
                                                    <label htmlFor="name">Your Name</label>
                                                    <input type="text" className="input-control" />
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="email">Your Email</label>
                                                    <input type="email" className="input-control" />
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="username">Username</label>
                                                    <input type="text" className="input-control" />
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="phone">Your Phone Number</label>
                                                    <input type="email" className="input-control"  pattern="[0-9]+"/>
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" className="input-control" />
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="country">Country</label>
                                                    <input type="text" className="input-control" />
                                         </div>
                              </div>

                              <div className="save-btn">
                                       <button type="submit">Save</button>
                                       <button>Cancel</button>
                              </div>
                    </div>








                </form>
    </div>
  )
}

export default AdminAccount