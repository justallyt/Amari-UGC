import { useEffect, useState } from "react"
import { Link, NavLink,useNavigate } from "react-router-dom"
import { VscEye } from "react-icons/vsc"
import { VscEyeClosed } from "react-icons/vsc"
import { useForm } from "react-hook-form"
import { useLoginUserMutation } from "../redux/usersSlice"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials, clearPop } from "../redux/authSlice"
import toast, { Toaster } from "react-hot-toast"
import Spinner from "./Spinner"

const LoginUser = () => {
  const [ status, setStatus] = useState(false);

  const changeStatus = () =>{
        setStatus(!status);
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pop } = useSelector(state => state.auth);

  // Logout pop message
  useEffect(()=> {
        if(pop){
               toast.success(pop.message, { id: 'logout'})
         }
        setTimeout(()=> {
              dispatch(clearPop());
         }, 3000)
  }, [pop, dispatch])

  const [ loginUser, { isLoading } ] = useLoginUserMutation()

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

const authUser = async(data) => {
       try {
            const res = await loginUser(data).unwrap();
            dispatch(setCredentials({...res}));
             navigate(`/${res.role.toLowerCase()}/${res.username === 'null' ?  res.id : res.username}/`);
       } catch (error) {
             toast.error("Login failed. Please try again")
       }
       reset();
}
  return (
    <div className="consumer-form">
               <Toaster />
               
              { isLoading ?  <Spinner /> : ''}
             <form onSubmit={handleSubmit(authUser)}>
                     <div className="form-row">
                               <label htmlFor="email">Email Address <span>*</span></label>
                               <input type="email" className={errors.email ? "form-control error" : "form-control"} {...register('email', { required: 'Your email is required'})} placeholder="abby@email.com"  />
                               <span className="error">{errors.email && errors.email.message}</span>
                     </div>
                     <div className="form-row">
                               <label htmlFor="password">Password <span>*</span></label>
                               <div className={errors.password ? "password-input error" : "password-input"}>
                                         <input type={ status ? "text" : "password"} placeholder="Strong Password" {...register("password", {required: "Enter a valid strong password" })} className="form-control"  />
                                         <div className={ status ? "toggle-btn active" : "toggle-btn"} onClick={changeStatus}>
                                                  <span><VscEye /></span>
                                                  <span className="yes"><VscEyeClosed /></span>
                                         </div>
                                </div>
                                <span className="error">{errors.password && errors.password.message}</span>
                     </div>
                       <Link to={'/user/forgot-password'} className="forgot-password">Forgot your Password?</Link>
                     <button type="submit" className="btn-submit">Log in</button>
             </form>

             <p className="redirect">Do not have an account? <NavLink to="/user/register">Create One</NavLink></p>
    </div>
  )
}

export default LoginUser