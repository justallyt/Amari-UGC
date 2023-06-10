import { useState } from "react"
import Footer from "../../components/Footer"
import { VscEye } from "react-icons/vsc"
import { VscEyeClosed } from "react-icons/vsc"
import { NavLink } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useCreateUserMutation } from "../../redux/apiSlice"
const RegisterBrand = () => {
  const [ status, setStatus] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
 const [ registerbrand ] = useCreateUserMutation();

 const createBrand = async (data) => {
  if(data.terms === true){
        data.role = "Brand";
  }
   try {
        const res = await registerbrand(data).unwrap();
        console.log(res)
   } catch (err) {
         console.log("Nothing happened")
   }
 //Reset form after submission
  reset();
}

  const changeStatus = () =>{
        setStatus(!status);
  }
  return (
    <div className="register-brand">
               <div className="small-intro tweak">
                         <h2>Register Your Company</h2>
                         <p>Enter your details to create your account:</p>
               </div>

               <div className="form">
                         <form method="post" onSubmit={handleSubmit(createBrand)}>
                                  <div className="form-row">
                                           <label htmlFor="name">Organization Name <span>*</span></label>
                                           <input type="text" {...register('name', { required: 'Organization name required'})} placeholder="Amari Consulting Ltd" className={errors.name ? "form-control error" : "form-control"} />
                                           <span className="error">{errors.name && errors.name.message}</span>
                                  </div>
                                  <div className="form-row">
                                           <label htmlFor="email">Organization Email <span>*</span></label>
                                           <input type="email" {...register('email', {required: "Organization email required"})} placeholder="email@company.com" className={errors.email ? "form-control error" : "form-control"} />
                                           <span className="error">{errors.email && errors.email.message}</span>
                                  </div>
                                  <div className="form-row split">
                                           <div className="form-column">
                                                    <label htmlFor="phone">Organization Phone <span>*</span></label>
                                                    <input type="text" {...register('phone', { required: "Phone number required"})} placeholder="+254 712345678" className={errors.phone ? "form-control error" : 'form-control'} />
                                                    <span className="error">{errors.phone && errors.phone.message}</span>
                                           </div>
                                           <div className="form-column">
                                                    <label htmlFor="name">Organization Country <span>*</span></label>
                                                    <input type="text" placeholder="Kenya" className={errors.country ? 'form-control error' : 'form-control'} {...register('country', { required: "Organization country required"})} />
                                                    <span className="error">{errors.country && errors.country.message}</span>
                                           </div>
                                  </div>
                                  <div className="form-row">
                                          <label htmlFor="business">Business Type</label>
                                          <input type="text" placeholder="Consulting" className={errors.businessType ? 'form-control error' : 'form-control'} {...register('businessType', {required: 'Business category required'})}/>
                                          <span className="error">{errors.businessType && errors.businessType.message}</span>
                                  </div>
                                  <div className="form-row">
                                          <label htmlFor="password">Password <span>*</span></label>
                                          <div className={errors.password ? "password-input error" : "password-input"}>
                                                   <input type={ status ? "text" : "password"} {...register('password', {required: "Strong password required", minLength: 8})} placeholder="Strong Password" className={errors.password ? "form-control error" :"form-control"} />
                                                   <div className={ status ? "toggle-btn active" : "toggle-btn"} onClick={changeStatus}>
                                                            <span><VscEye /></span>
                                                            <span className="yes"><VscEyeClosed /></span>
                                                   </div>
                                          </div>
                                          <span className="error">{errors.password && errors.password.message}</span>
                                  </div>

                                  <div className="agreement">
                                              <input type="checkbox" className="check" {...register("terms", { required: "Kindly read through our terms and policy"})} />
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

export default RegisterBrand