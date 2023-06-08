import { useState } from "react"
import { NavLink,useNavigate } from "react-router-dom"
import { VscEye } from "react-icons/vsc"
import { VscEyeClosed } from "react-icons/vsc"
import { useForm } from "react-hook-form"
import { useLoginConsumerMutation } from "../redux/apiSlice"
import { useDispatch } from "react-redux"
const LoginUser = () => {
  const [ status, setStatus] = useState(false);

  const changeStatus = () =>{
        setStatus(!status);
  }

  const navigate = useNavigate();
  //const dispatch = useDispatch();

  const [ loginConsumer ] = useLoginConsumerMutation()

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

const loginUser = async(data) => {
       try {
            const res = await loginConsumer(data).unwrap();
            console.log(res)
            navigate('/')
       } catch (error) {
             console.log(error);
             console.log("nothing happened. Please try again")
       }

       reset();
}
  return (
    <div className="consumer-form">
             <form onSubmit={handleSubmit(loginUser)}>
                     <div className="form-row">
                               <label htmlFor="email">Email Address <span>*</span></label>
                               <input type="email" className={errors.email ? "form-control error" : "form-control"} {...register('email', { required: 'Your email is required'})} placeholder="abby@email.com"  />
                               <span className="error">{errors.email && errors.email.message}</span>
                     </div>
                     <div className="form-row">
                               <label htmlFor="password">Password <span>*</span></label>
                               <div className={errors.password ? "password-input error" : "password-input"}>
                                         <input type={ status ? "text" : "password"} placeholder="Strong Password" {...register("password", {required: "Enter a valid strong password", minLength: 8})} className="form-control"  />
                                         <div className={ status ? "toggle-btn active" : "toggle-btn"} onClick={changeStatus}>
                                                  <span><VscEye /></span>
                                                  <span className="yes"><VscEyeClosed /></span>
                                         </div>
                                </div>
                                <span className="error">{errors.password && errors.password.message}</span>
                     </div>

                     <button type="submit" className="btn-submit">Log in</button>
             </form>

             <p className="redirect">Do not have an account? <NavLink to="/user/register">Create One</NavLink></p>
    </div>
  )
}

export default LoginUser