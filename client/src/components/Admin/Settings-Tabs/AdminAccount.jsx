import { useState, useEffect } from "react"
import profileImg from "../../../assets/dummyprofile.png"
import { BsEyeSlash, BsEye } from "react-icons/bs"
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form'
import { clearProfilePic } from "../../../redux/profileSlice";
const AdminAccount = () => {
  const [ view, setView] = useState(false);
  const [ status, setStatus] = useState(false)
  const { profile } = useSelector(state => state.profile);
  const [ userImage, setUserImage ] = useState([])
  const [ imageUrl, setImageUrl] = useState([]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
            name: profile.name,
            username: profile.username === 'null' ? '' : profile.username,
            email: profile.email,
            phone: profile.phone === 'null' ? '' : profile.phone,
            bio: profile.bio === 'null' ? '' : profile.bio,
            country: profile.address.country === 'null' ? '' : profile.address.country,
            city: profile.address.city === 'null' ? '' : profile.address.city
    }
});
const dispatch = useDispatch();
const uploadProfile = (e) => {
      setUserImage([...e.target.files]); 
}

const clearImageProfile = () => {
         setImageUrl([]);
         setUserImage([]);
         setStatus(false)
         dispatch(clearProfilePic())
}

useEffect(() => {
  if(userImage.length < 1) return;

  const profileUrl = [];
  userImage.forEach(kitu => {
          profileUrl.push(URL.createObjectURL(kitu));
          setStatus(true)
  });
  setImageUrl(profileUrl)

}, [userImage])
  return (
    <div className="account-wrapper">
                <form>
                     <div className="wrapper-split">
                            <div className="profile-row">
                                      <h3>Change Profile</h3>
                                      <p>Change your profile picture from here</p>

                                      <div className="upload-profile-box">
                                                  <div className="upload-image">
                                                            { status ?  <img src={imageUrl} alt="" /> :  <img src={profile.profilePic.url !== 'null' ? profile.profilePic.url : profileImg} alt="" />}
                                                  </div>
                                                  <div className="upload-btns">
                                                             <span  className="upload-btn">
                                                                       <input type="file" {...register('profileImage')} onChange={uploadProfile}  />
                                                                       <p>Upload</p>
                                                              </span>
                                                             <p onClick={clearImageProfile}>Reset</p>
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
                                                                 <input type={view ? "text" : "password"} {...register('password')} className="input-control" value="1234500"  />
                                                      </div>
                                                      <div className="input-row">
                                                                 <label htmlFor="current-password">New Password</label>
                                                                 <input type={view ? "text" : "password"} {...register('new_pass')} className="input-control" value="1234500"   />
                                                      </div>
                                                      <div className="input-row">
                                                                 <label htmlFor="current-password">Confirm Password</label>
                                                                 <input type={view ? "text" : "password"} {...register('confirm_pass')} className="input-control" value="1234500"   />
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
                                                    <input type="text" className="input-control" {...register('name')} />
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="email">Your Email</label>
                                                    <input type="email" className="input-control" {...register('email')}/>
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="username">Username</label>
                                                    <input type="text" className="input-control" {...register('username')} />
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="phone">Your Phone Number</label>
                                                    <input type="email" className="input-control"  pattern="[0-9]+" {...register('phone') }/>
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" className="input-control" {...register('city')} />
                                         </div>
                                         <div className="input-row">
                                                    <label htmlFor="country">Country</label>
                                                    <input type="text" className="input-control" {...register('country')} />
                                         </div>
                              </div>

                              <div className="save-btn">
                                       <button type="submit">Save</button>
                              </div>
                    </div>








                </form>
    </div>
  )
}

export default AdminAccount