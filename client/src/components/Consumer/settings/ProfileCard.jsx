import profile from "../../../assets/dummyprofile.png"
const ProfileCard = () => {
  return (
    <div className="settings-tab">
               <div className="tab-title">
                         <h2>Profile Settings</h2>
               </div>
               <form>
                         <div className="profile-picture">
                                    <h2>Edit Profile Picture</h2>
                                    <div className="picture-wrap">
                                               <div className="picture-box">
                                                          <div className="image-part">
                                                                   <img src={profile} alt="" />
                                                          </div>
                                                         <div className="picture-texts">
                                                                 <p>Upload new image</p>
                                                                <span>Max file size - 2mb</span>
                                                         </div>
                                               </div>
                                               <div className="picture-btns">
                                                         <p>Upload</p>
                                                         <p>Remove Image</p>
                                               </div>
                                    </div>
                         </div>
                         <div className="personal-info">
                                    <h2>Personal Information</h2>
                                    <div className="settings-form-row">
                                                <div className="form-column">
                                                            <label htmlFor="Name">Full Name</label>
                                                            <input type="text" className="input-control" defaultValue=''  />
                                                </div>
                                                <div className="form-column">
                                                            <label htmlFor="username">Username</label>
                                                            <input type="text"  className="input-control" value='' />
                                                </div>
                                    </div>

                                    <div className="settings-form-row">
                                                <div className="form-column">
                                                            <label htmlFor="Email Address">Email</label>
                                                            <input type="email" className="input-control" defaultValue=''  />
                                                </div>
                                                <div className="form-column">
                                                            <label htmlFor="Phone">Phone Number</label>
                                                            <input type="text"  className="input-control" defaultValue='' />
                                                </div>
                                    </div>
                                    <div className="bio-field">
                                               <label htmlFor="Bio">Bio</label>
                                               <textarea name="" id="" cols="30" rows="10"></textarea>
                                    </div>
                                    <div className="settings-form-row">
                                                <div className="form-column">
                                                            <label htmlFor="City">City</label>
                                                            <input type="text" className="input-control" defaultValue=''  />
                                                </div>
                                                <div className="form-column">
                                                            <label htmlFor="country">Country</label>
                                                            <input type="text"  className="input-control" defaultValue='' />
                                                </div>
                                    </div>

                                    <div className="settings-btn">
                                                  <button type="submit">Save Changes</button>
                                    </div>
                         </div>
               </form>
    </div>
  )
}

export default ProfileCard