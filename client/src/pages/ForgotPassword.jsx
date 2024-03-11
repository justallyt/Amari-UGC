import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { useForm } from 'react-hook-form'
import Footer from "../components/Footer"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { useState } from "react"
import { useConfirmPasswordResetMutation, useResendPasswordResetMutation, useValidatePasswordResetMutation } from "../redux/usersSlice"
import Spinner from "../components/Spinner"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { setInterimName } from "../redux/authSlice"

const ForgotPassword = () => {
    const [loadingStatus, setLoadingStatus ] = useState(false);
    const [emailStatus, setEmailStatus] = useState(true);
    const [ otpStatus, setOtpStatus ] = useState(false);
    const [ resetStatus, setResetStatus] = useState(false);
    const [status, setStatus] = useState(false);
    const [ confirmStatus, setConfirmStatus] = useState(false);
  const dispatch = useDispatch();
  const { interimName } = useSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors },watch } = useForm();
    const [ checkEmailAccount ] = useConfirmPasswordResetMutation();
    const [ validatePasswordOTP ] = useValidatePasswordResetMutation();
    const [ resendPasswordOTP ] = useResendPasswordResetMutation();
    //submit email to reset password
    const submitEmail = async(data) =>{
            setLoadingStatus(true);
           try {
                 const res = await checkEmailAccount(data).unwrap();
                 if(res){
                       setEmailStatus(false);
                       setOtpStatus(true);
                       setLoadingStatus(false);
                       dispatch(setInterimName({...res}));
                       toast.success(res.message, { id: 'password-reset-otp-success'})
                 }else{
                       toast.error("You don't seem to have an account with us yet. Please create an account", { id: 'invalid-user-account'})
                 }
           } catch (error) {
                  setLoadingStatus(false);
                  toast.error(error.data.message, { id: 'password-reset-confirmation-error'})
           }
    }

    //submit otp to verify request
    const submitOtp = async(data) => {
           setLoadingStatus(true);
            const { otp } = data;

            const reqBody = {
                    otp: otp,
                    id: interimName !== null ? interimName.id : 'empty'
            }

            try {
                  const res = await validatePasswordOTP(reqBody).unwrap();

                  if(res){
                        setOtpStatus(false);
                        setResetStatus(true);
                        setLoadingStatus(false);
                        dispatch(setInterimName({...res}));
                        toast.success(res.message, { id: 'otp-password-success-message'})
                  }
            } catch (error) {
                  setLoadingStatus(false);
                  toast.error(error.data.message, { id: 'otp-password-reset-error'})
            }
    }
   //resend password otp
   const resendPasswordReset = async() => {
      const id = interimName !== null ? interimName.id : 'empty';

      try {
             const res = resendPasswordOTP({ id }).unwrap();
             if(res){
                  toast.success("OTP resend successful", { id: 'otp-resend-success'})
             }
      } catch (error) {
            toast.error(error.data.message, { id: 'otp-resend-error'})
      }
   }
    //reset account password
    const submitPasswordReset = (data) => {
        console.log(data)
}
  return (
    <div className="login-wrapper">
              <Toaster />

              { loadingStatus ?  <Spinner /> : ''}
              <div className="inner-row">
                          <div className="login-content">
                                     <header>
                                         <div className="logo">
                                              <Link to={'/user/login'}>
                                                      <img src={logo} alt="App logo" />
                                              </Link>
                                          </div>
                                    </header>
                                    { emailStatus ? 
                                         <div className="login-user">
                                                      <div className="small-intro tweak">
                                                                 <h2> Amari Support Center</h2>
                                                                  <p>Sorry to hear that you&apos;ve lost your password. Let us help you reset it.</p>
                                                      </div>
                                            
                                                      <div className="account-themselfu confirm">
                                                                  <form onSubmit={handleSubmit(submitEmail)}>
                                                                           <div className="form-row">
                                                                                      <label htmlFor="name">Email Address <span>*</span></label>
                                                                                      <input type="email" placeholder="Your acount email" className={errors.email ? "form-control error" : "form-control"} {...register('email', { required: 'Your email address is required'})} />
                                                                                      <span className="error">{errors.email && errors.email.message}</span>
                                                                              </div>
                                                                             <button type="submit" className="btn-submit">Send OTP</button>
                                                                  </form>
                                                      </div>
                                          </div>
                                    
                                    : ''}
                                    { otpStatus ? 
                                            <div className="login-user">
                                                       <div className="small-intro tweak">
                                                                  <h2> Amari Support Center</h2>
                                                                   <p>Enter the otp code sent to your email address to resetyour account password:</p>
                                                       </div>
                                     
                                                       <div className="account-themselfu confirm">
                                                                    <form onSubmit={handleSubmit(submitOtp)}>
                                                                           <div className="form-row">
                                                                                       <label htmlFor="name">OTP code <span>*</span></label>
                                                                                       <input type="text" placeholder="OTP" className={errors.name ? "form-control error" : "form-control"} {...register('otp', { required: 'otp code is required'})} />
                                                                                       <span className="error">{errors.otp && errors.otp.message}</span>
                                                                           </div>
                                                                            <p>Didn&apos;t receive the otp? <span onClick={resendPasswordReset}>Resend OTP</span></p>
                                                                           <button type="submit" className="btn-submit">Confirm OTP </button>
                                                                   </form>
                                                       </div>
                                          </div>
                                    
                                    : ''}
                                     { resetStatus ? 
                                            <div className="login-user">
                                                      <div className="small-intro tweak">
                                                                 <h2> Amari Support Center</h2>
                                                                  <p>Enter your new account password:</p>
                                                      </div>
                                    
                                                      <div className="account-themselfu confirm">
                                                                   <form onSubmit={handleSubmit(submitPasswordReset)}>
                                                                         <div className="form-row">
                                                                                   <label htmlFor="password">New Password <span>*</span></label>
                                                                                   <div className={errors.password ? "password-input error" : "password-input"}>
                                                                                            <input type={ status ? "text" : "password"} {...register('password', {required: "Strong password required", minLength: 8})} placeholder="New Password" className={errors.password ? "form-control error" :"form-control"} />
                                                                                            <div className={ status ? "toggle-btn active" : "toggle-btn"} onClick={() => setStatus(!status)}>
                                                                                                     <span><VscEye /></span>
                                                                                                     <span className="yes"><VscEyeClosed /></span>
                                                                                            </div>
                                                                                   </div>
                                                                                <span className="error">{errors.password && errors.password.message}</span>
                                                                         </div>
                                                                         <div className="form-row">
                                                                            <label htmlFor="password">Confirm New Password <span>*</span></label>
                                                                            <div className={errors.confirmPassword ? "password-input error" : "password-input"}>
                                                                                     <input type={ confirmStatus ? "text" : "password"} {...register('confirmPassword', {
                                                                                                required: true, 
                                                                                                minLength: 8,
                                                                                                validate: val => {
                                                                                                       if(watch("password") !== val){
                                                                                                           return "Passwords do not match";
                                                                                                       }
                                                                                                }
                                                                                                })} placeholder="Confirm New Password" className={errors.confirmPassword ? "form-control error" :"form-control"} />
                                                                                     <div className={ confirmStatus ? "toggle-btn active" : "toggle-btn"} onClick={() => setConfirmStatus(!confirmStatus)}>
                                                                                              <span><VscEye /></span>
                                                                                              <span className="yes"><VscEyeClosed /></span>
                                                                                     </div>
                                                                            </div>
                                                                            <span className="error">{errors.confirmPassword && errors.confirmPassword.message}</span>
                                                                    </div>
                                                                          
                                                                          <button type="submit" className="btn-submit">Reset Password</button>
                                                                  </form>
                                                      </div>
                                         </div>
                                     : '' }                            
                          </div>
              </div>

              <Footer />
    </div>
  )
}

export default ForgotPassword