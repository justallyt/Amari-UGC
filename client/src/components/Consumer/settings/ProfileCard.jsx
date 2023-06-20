import profileImg from "../../../assets/dummyprofile.png"
import { useSelector } from "react-redux"
import { FiCheck } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from "react"
import { useUpdateUserProfileMutation } from "../../../redux/usersSlice"
const ProfileCard = () => {
  const { profile } = useSelector(state => state.profile);
  const [ userImage, setUserImage ] = useState([])
  const [ imageUrl, setImageUrl] = useState([]);
  const [ status, setStatus] = useState(false)
  const { register, handleSubmit } = useForm({
        defaultValues: {
                name: profile.name,
                username: profile.username === 'null' ? '' : profile.username,
                email: profile.email,
                phone: profile.phone === 'null' ? '' : profile.phone,
                bio: profile.bio === 'null' ? '' : profile.bio,
                country: profile.country === 'null' ? '' : profile.country,
                city: profile.city === 'null' ? '' : profile.city
        }
  });
  
  const uploadProfile = (e) => {
          setUserImage([...e.target.files]); 
  }
  const clearImageProfile = () => {
         setImageUrl([]);
         setUserImage([]);
         setStatus(false)
  }
  useEffect(() => {
         if(userImage.length < 1) return;

         const profileUrl = [];
         userImage.forEach(kitu => {
                 profileUrl.push(URL.createObjectURL(kitu))
                 setStatus(true)
         });
         setImageUrl(profileUrl)

  }, [userImage])

  const [ updateUser ] = useUpdateUserProfileMutation();

  const updateForm = async (data) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('profileImage', data.profileImage[0]);
      
         try {
               const res = await updateUser(formData);
               console.log(res.data)
         } catch (error) {
               console.log(error)
         }
  }
  return (
    <div className="settings-tab">
               <div className="tab-title">
                         <h2>Profile Settings</h2>
               </div>
               <form onSubmit={handleSubmit(updateForm)} encType="multipart/form-data">
                         <div className="profile-picture">
                                    <h2>Edit Profile Picture</h2>
                                    <div className="picture-wrap">
                                               <div className="picture-box">
                                                          <div className="image-part">
                                                                  { status ?  <img src={imageUrl} alt="" /> :  <img src={profileImg} alt="" />}
                                                          </div>
                                                         {/* <div className="picture-texts">
                                                                 <p>Upload new image</p>
                                                                <span>Max file size - 2mb</span>
                                                         </div> */}
                                                         <div className="upload-status">
                                                                  <div className="status-top">
                                                                           <p className="image-name"> </p>
                                                                           { status ? <span className="check"><FiCheck /></span>: ''}
                                                                  </div>
                                                         </div>
                                               </div>
                                               <div className="picture-btns">
                                                         <span  className="upload-btn">
                                                                  <input type="file" {...register('profileImage')} onChange={uploadProfile}  />
                                                                  <p>Upload</p>
                                                         </span>
                                                         <p onClick={clearImageProfile}>Remove Image</p>
                                               </div>
                                    </div>
                         </div>
                         <div className="personal-info">
                                    <h2>Personal Information</h2>
                                    <div className="settings-form-row">
                                                <div className="form-column">
                                                            <label htmlFor="Name">Full Name</label>
                                                            <input type="text" className="input-control" {...register('name', { required: 'Please enter your name'})}  />
                                                </div>
                                                <div className="form-column">
                                                            <label htmlFor="username">Username</label>
                                                            <input type="text"  className="input-control" {...register('username', { required: 'Please enter your username'})} />
                                                </div>
                                    </div>

                                    <div className="settings-form-row">
                                                <div className="form-column">
                                                            <label htmlFor="Email Address">Email</label>
                                                            <input type="email" className="input-control" {...register('email', { required: 'Please enter your email address'})} />
                                                </div>
                                                <div className="form-column">
                                                            <label htmlFor="Phone">Phone Number</label>
                                                            <input type="text"  className="input-control" {...register('phone')} />
                                                </div>
                                    </div>
                                    <div className="bio-field">
                                               <label htmlFor="Bio">Bio</label>
                                               <textarea name="" id="" cols="30" rows="10" {...register('bio')}></textarea>
                                    </div>
                                    <div className="settings-form-row">
                                                <div className="form-column">
                                                            <label htmlFor="City">City</label>
                                                            <input type="text" className="input-control" {...register('city')} />
                                                </div>
                                                <div className="form-column">
                                                            <label htmlFor="country">Country</label>
                                                            <input type="text"  className="input-control" { ...register('country')} />
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