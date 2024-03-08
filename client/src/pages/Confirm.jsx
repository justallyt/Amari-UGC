import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { useForm } from 'react-hook-form'

const Confirm = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const confirmOTP = (data) =>{
           console.log(data)
    }
  return (
    <div className="login-wrapper">
             
    <div className="inner-row">
              <div className="login-content">
                      <header>
                              <div className="logo">
                                     <Link to={'/'}>
                                             <img src={logo} alt="App logo" />
                                     </Link>
                              </div>
                              <div className="header-btns">
                                
                              </div>
                        </header>

                        <div className="login-user">
                                  <div className="small-intro tweak">
                                              <h2> Welcome To Amari UGC, </h2>
                                              <p>Enter the otp code sent to your email address to verify your account:</p>
                                  </div>
                                  
                                 <div className="account-themselfu confirm">
                                             <form onSubmit={handleSubmit(confirmOTP)}>
                                                      <div className="form-row">
                                                                 <label htmlFor="name">OTP code <span>*</span></label>
                                                                 <input type="text" placeholder="OTP" className={errors.name ? "form-control error" : "form-control"} {...register('otp', { required: 'otp code is required'})} />
                                                                 <span className="error">{errors.otp && errors.otp.message}</span>
                                                        </div>
                                                         <p>Didn&apos;t receive the otp? <span>Resend OTP</span></p>
                                                        <button type="submit" className="btn-submit">Confirm Account</button>
                                             </form>
                                 </div>
                        </div>
              </div>
    </div>

    <Footer />
</div>
  )
}

export default Confirm