import { VscEye, VscEyeClosed } from "react-icons/vsc"
import Footer from "../../components/Footer"
import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux"
import { useCreateConsumerMutation } from "../../redux/apiSlice"
import { setCredentials } from "../../redux/authSlice"
const RegisterConsumer = () => {
   const [ status, setStatus] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { userInfo } = useSelector(state => state.auth);

   const [ registerconsumer ] = useCreateConsumerMutation();

   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   

  //  useEffect(()=> {
  //      if(userInfo){
  //           navigate('/dashboard')
  //      }
  //  }, [navigate, userInfo])


   const createConsumer = async (data) => {
          console.log(data)
           try {
                const res = await registerconsumer(data).unwrap();
                dispatch(setCredentials({...res}));
                navigate('/')
           } catch (err) {
                 console.log("Nothing happened")
           }


         //Reset form after submission
          reset();
   }
   //Toggle Show Password
   const changeStatus = () =>{
         setStatus(!status);
   }
  return (
    <div className="register-brand">
               <div className="small-intro tweak">
                         <h2>Create your Account</h2>
                         <p>Enter your details to create your account:</p>
               </div>

               <div className="form">
                        <form onSubmit={handleSubmit(createConsumer)}>
                                 <div className="form-row">
                                           <label htmlFor="name">Full Name <span>*</span></label>
                                           <input type="text" placeholder="Abigail Bundi" className={errors.name ? "form-control error" : "form-control"} {...register('name', { required: 'Your name is required'})} />
                                           <span className="error">{errors.name && errors.name.message}</span>
                                  </div>
                                  <div className="form-row">
                                           <label htmlFor="email">Email Address <span>*</span></label>
                                           <input type="email" placeholder="abby@email.com" className={errors.email ? "form-control error" : "form-control"} {...register('email', { required: "Your email address is required"})} />
                                           <span className="error">{errors.email && errors.email.message}</span>
                                  </div>
                                  <div className="form-row">
                                          <label htmlFor="password">Password <span>*</span></label>
                                          <div className={errors.password ? "password-input error" : "password-input"}>
                                                   <input type={ status ? "text" : "password"} placeholder="Strong Password" className="form-control" {...register("password", {required: "Enter a valid strong password", minLength: 8})} />
                                                   <div className={ status ? "toggle-btn active" : "toggle-btn"} onClick={changeStatus}>
                                                            <span><VscEye /></span>
                                                            <span className="yes"><VscEyeClosed /></span>
                                                   </div>
                                          </div>
                                          <span className="error">{errors.password && errors.password.message}</span>
                                  </div> 

                                  <div className="agreement">
                                            <input type="checkbox" className="check" {...register("consumer", { required: "Kindly read through our terms and policy"})} />
                                            <p>I agree to the <a href="s">Terms of Service</a> and <a href="s">Privacy Policy</a></p>
                                  </div>
                                  <span className="error">{errors.terms && errors.terms.message}</span>

                                  <button type="submit" className="btn-submit">Create Account</button>
                        </form>

                        <p className="redirect">Already have an account? <NavLink to="/user/login">Login</NavLink></p>
               </div>

               <Footer />
    </div>
  )
}

export default RegisterConsumer