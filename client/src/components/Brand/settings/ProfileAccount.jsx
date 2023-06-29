import { ImFilePicture } from "react-icons/im"
import { FiCheck } from 'react-icons/fi'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from 'react-hook-form'
import { useUpdateUserProfileMutation } from "../../../redux/usersSlice"
import { clearProfilePic, setProfile } from "../../../redux/profileSlice"
import toast, { Toaster } from "react-hot-toast"
import Spinner from "../../Spinner"
const ProfileAccount = () => {
  const [logoImage, setLogoImage] = useState([])
  const [logoUrl, setLogoUrl] = useState([])
  const [ logoStatus, setLogoStatus] = useState(false)
  
  const { profile } = useSelector(state => state.profile)
  const dispatch = useDispatch();
  const { register, handleSubmit, resetField, formState: { errors } } = useForm({
    defaultValues: {
            name: profile.name,
            username: profile.username === 'null' ? '' : profile.username,
            email: profile.email,
            phone:  profile.phone,
            businessType: profile.businessType,
            bio: profile.bio === 'null' ? '' : profile.bio,
            country: profile.address.country,
            city: profile.address.city === 'null' ? '' : profile.address.city
    }
});

  //Upload logo
  const uploadLogo = (e) => {
          setLogoImage([...e.target.files]);
          if(errors.profileImage){
              errors.profileImage.message = ''
          }
  }
  const removeLogo = () =>{
        setLogoImage([])
        setLogoUrl([])
        setLogoStatus(false)
        dispatch(clearProfilePic());
       resetField('profileImage')
  }
  useEffect(() => {
          if(logoImage.length < 1) return;
          const logoArr = []

          logoImage.forEach(kitu => {
                   logoArr.push(URL.createObjectURL(kitu));
                   setLogoStatus(true)
          })
          setLogoUrl(logoArr);
  }, [logoImage])

  //Updating the brand profile details
  const [updateUser, { isLoading }] = useUpdateUserProfileMutation();
 
  const updateBrand = async (data) => {
         const formData = new FormData();
         formData.append('data', JSON.stringify(data));
         formData.append('profileImage', data.profileImage[0]);

         try {
                const res = await updateUser(formData);

                dispatch(setProfile({...res.data.info}));
                toast.success("Update Successful", { id: 'brand-update-success'})
         }catch(error){
                console.log(error);
                toast.error('Update Failed. Please contact administration for help', { id: 'brand-update-error'})
         }
  }
  return (
    <div className="profile-account-tab">
                 <Toaster />

                 { isLoading ? <Spinner /> : ''}
                 <div className="account-intro">
                            <h3>Account Profile</h3>
                            <p>Edit your account details to help creators find you easily</p>
                 </div>
                 <div className="profile-form">
                             <form onSubmit={handleSubmit(updateBrand)}>
                                        <div className="profile-form-row">
                                                     <div className="form-column">
                                                                <label htmlFor="Company">Company Name</label>
                                                                <input type="text" className="form-control" {...register('name', { required: 'Please enter your name'})} />
                                                                <span className="error">{errors.name && errors.name.message}</span>
                                                     </div>
                                                     <div className="form-column">
                                                                <label htmlFor="email">Company Email</label>
                                                                <input type="email" className="form-control" {...register('email', { required: 'Please enter your email address'})}  />
                                                                <span className="error">{errors.email && errors.email.message}</span>
                                                     </div>
                                        </div>
                                        <div className="profile-column">
                                                     <label htmlFor="username">Username</label>
                                                     <div className="username-box">
                                                               <div className="default">
                                                                           <p>www.amari.com/brand/</p>
                                                               </div>
                                                               <input type="text" className="form-control" {...register('username', { required: 'Please enter your username'})}/>    
                                                     </div>
                                                     <span className="error">{errors.username && errors.username.message}</span>
                                        </div>
                                        <div className="profile-logo">
                                                    <label htmlFor="Company Logo">Company Logo</label>
                                                    <div className="logo-wrap">
                                                                <div className="logo-wrap-inner">
                                                                          <div className="logo-part">
                                                                                 { logoStatus ? 
                                                                                        <div className="logo-box">
                                                                                                 <img src={logoUrl} alt="" />
                                                                                        </div>
                                                                                        : profile.profilePic.url !== 'null' ?
                                                                                         <div className="logo-box">
                                                                                                 <img src={profile.profilePic.url} alt="" />
                                                                                         </div>
                                                                                        :  <span><ImFilePicture /></span>
                                                                                 }
                                                                        </div>
                                                                        { logoStatus ? <span className="check"><FiCheck /></span> : ''}
                                                                </div>
                                                              
                                                                <div className="action-btns">
                                                                            <div className="upload-btn">
                                                                                        <input type="file" {...register('profileImage', { required: 'Please add your company logo'})} onChange={uploadLogo}   />
                                                                                        <p>Upload</p>
                                                                            </div>
                                                                            <p onClick={removeLogo}>Remove Logo</p>
                                                                </div>
                                                    </div>
                                                    <span className="error">{errors.profileImage && errors.profileImage.message}</span>
                                        </div>
                                        <div className="profile-form-row">
                                                     <div className="form-column">
                                                                <label htmlFor="Phone">Phone Number</label>
                                                                <input type="text" className="form-control" {...register('phone', { required: 'Please enter your phone number'})} />
                                                                <span className="error">{errors.phone && errors.phone.message}</span>
                                                     </div>
                                                     <div className="form-column">
                                                                <label htmlFor="bizgani">Type of Business</label>
                                                                <input type="text" className="form-control" {...register('businessType', { required: 'Please enter your business category'})} />
                                                                <span className="error">{errors.businessType && errors.businessType}</span>
                                                     </div>
                                        </div>
                                        <div className="profile-column">
                                                     <label htmlFor="brief">Company Brief</label>
                                                     <textarea {...register('bio', { required: 'Please describe your business'})}  cols="30" rows="10" placeholder="A small brief about your company"></textarea>
                                                     <span className="error">{errors.bio && errors.bio.message}</span>
                                        </div>
                                        <div className="profile-form-row">
                                                     <div className="form-column">
                                                                <label htmlFor="country">Country</label>
                                                                <input type="text" className="form-control" {...register('country', {required: 'Please enter your country'})} />
                                                                <span className="error">{errors.country && errors.country.message}</span>
                                                     </div>
                                                     <div className="form-column">
                                                                <label htmlFor="city">City</label>
                                                                <input type="text" className="form-control"  {...register('city', { required: 'Please enter your city'})} />
                                                                <span className="error">{errors.city && errors.city.message}</span>
                                                     </div>
                                        </div>

                                        <div className="settings-btn">
                                                  <button type="submit">Save Changes</button>
                                        </div>
                             </form>
                 </div>
    </div>
  )
}

export default ProfileAccount