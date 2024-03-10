import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { useForm } from 'react-hook-form'
import Footer from "../components/Footer"
const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
  return (
    <div className="login-wrapper">
              <div className="inner-row">
                          <div className="login-content">
                                     <header>
                                         <div className="logo">
                                              <Link to={'/user/login'}>
                                                      <img src={logo} alt="App logo" />
                                              </Link>
                                          </div>
                                    </header>

                                    <div className="login-user">
                                  <div className="small-intro tweak">
                                              <h2> Amari Support Center</h2>
                                              <p>Sorry to hear that you&apos;ve lost your password. Let us help you reset it.</p>
                                  </div>
                                  
                                 <div className="account-themselfu confirm">
                                             <form>
                                                      <div className="form-row">
                                                                 <label htmlFor="name">Email Address <span>*</span></label>
                                                                 <input type="text" placeholder="Your acount email" className={errors.email ? "form-control error" : "form-control"} {...register('email', { required: 'Your email address is required'})} />
                                                                 <span className="error">{errors.email && errors.email.message}</span>
                                                         </div>
                                                        <button type="submit" className="btn-submit">Send OTP</button>
                                             </form>
                                 </div>
                        </div>
                          </div>
              </div>

              <Footer />
    </div>
  )
}

export default ForgotPassword