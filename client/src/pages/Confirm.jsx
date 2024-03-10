import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import logo from '../assets/logo.png'
import { useForm } from 'react-hook-form'
import { useConfirmUserMutation, useResendUserOTPMutation } from "../redux/usersSlice"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../redux/authSlice"
import  { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"
import toast, { Toaster } from "react-hot-toast"

const Confirm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { interimName } = useSelector(state => state.auth);
    const [ confirmAccount, { isLoading }] = useConfirmUserMutation()
   const [ resendUserOTP ] = useResendUserOTPMutation();

    const confirmOTP = async (data) =>{
             const { otp } = data;

             const reqBody = {
                     otp: otp,
                     id: interimName !== null ? interimName.id : 'empty'
             }
            try {
                const res = await confirmAccount(reqBody).unwrap();
            
                if(res){
                     dispatch(setCredentials({...res}));
                     navigate(`/${res.role.toLowerCase()}/${res.username === 'null' ? res.id : res.username}`);
                }else{
                      toast.error("Invalid OTP, Please input a correct one", { id: 'otp-error'});
                }
            } catch (error) {
                  toast.error(error.data.message, { id: 'otp-server-error'})
            }
    }

    //resend otp
    const resendOTP = async () => {
             const id = interimName !== null ? interimName.id : 'empty';

             try {
                    const res = resendUserOTP({ id }).unwrap();
                    if(res){
                         toast.success("OTP resend successful", { id: 'otp-resend-success'})
                    }
             } catch (error) {
                   toast.error(error.data.message, { id: 'otp-resend-error'})
             }
    }
  return (
    <div className="login-wrapper">
           <Toaster />

           { isLoading ?  <Spinner /> : ''}
         <div className="inner-row">
              <div className="login-content">
                      <header>
                              <div className="logo">
                                     <Link to={'/user/register/creator'}>
                                             <img src={logo} alt="App logo" />
                                     </Link>
                              </div>
                        </header>

                        <div className="login-user">
                                  <div className="small-intro tweak">
                                              <h2> Welcome To Amari UGC {interimName !== null ? `, ${interimName.name.split(" ")[0]}` : ''}</h2>
                                              <p>Enter the otp code sent to your email address to verify your account:</p>
                                  </div>
                                  
                                 <div className="account-themselfu confirm">
                                             <form onSubmit={handleSubmit(confirmOTP)}>
                                                      <div className="form-row">
                                                                 <label htmlFor="name">OTP code <span>*</span></label>
                                                                 <input type="text" placeholder="OTP" className={errors.name ? "form-control error" : "form-control"} {...register('otp', { required: 'otp code is required'})} />
                                                                 <span className="error">{errors.otp && errors.otp.message}</span>
                                                        </div>
                                                         <p>Didn&apos;t receive the otp? <span onClick={resendOTP}>Resend OTP</span></p>
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