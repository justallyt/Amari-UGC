import {CgClose} from "react-icons/cg"
import { useForm } from 'react-hook-form'
import { useCreateRewardForCreatorsMutation } from "../../redux/brand/brandSlice";
import toast, { Toaster } from "react-hot-toast"
import Spinner3 from "../Spinner3"
import { useEffect, useState } from "react";

const BrandRewardModal = ({ func }) => {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm(); 
 const [ CreateReward , { isLoading }] = useCreateRewardForCreatorsMutation();
  const [ rewardType, setRewardType] = useState("")


  const submit = async(data) => {
        try {
              const res = await CreateReward(data).unwrap();

              if(res){
                    func(false)
                    reset();
              }
        } catch (error) {
              toast.error("An error has occured", { id: 'reward-error'})
        }
  }


  const rewardChoice = watch("type")

  useEffect(() => {
        if(rewardChoice === "Custom"){
              setRewardType("Custom")
        }else{
             setRewardType("Coupon")
        }
  }, [rewardChoice])

  return (
    <div className="brand-reward-modal">
             <Toaster />
               <div className="modal-create-body">
                         <h3>Create a New Reward</h3>
                          <span className="close-btn" onClick={() => func(false)}><CgClose /></span>
                         <form onSubmit={handleSubmit(submit)}>
                                   <div className="reward-row">
                                             <label htmlFor="Reward Type">Reward Type</label>
                                              <select  className="reward-control" {...register("type", { required: "Please choose reward type"})}>
                                                         <option value="">Set Reward Type</option>
                                                         <option value="Coupon">Coupon</option>
                                                         <option value="Custom">Custom</option>
                                              </select>
                                              <span className="error">{errors.type && errors.type.message} </span>
                                   </div>
                                   { rewardType === "Custom" ? 
                                          <>
                                                  <div className="reward-row">
                                                          <label htmlFor="name">Name</label>
                                                          <input type="text" className="reward-control" placeholder="Reward name" {...register('name', { required: "Please name your reward"})} />
                                                         <span className="error">{errors.name && errors.name.message}</span>
                                                 </div>
                                                 <div className="reward-row">
                                                            <label htmlFor="reward-description">Custom Reward Description</label>
                                                             <textarea className="reward-control textarea" placeholder="Describe what your reward is all about" {...register("description", { required: "Reward description is required"})}></textarea>
                                                 </div>
                                          </>
                                          :
                                          <>
                                                <div className="reward-row">
                                                          <label htmlFor="name">Name</label>
                                                          <input type="text" className="reward-control" placeholder="Reward name" {...register('name', { required: "Please name your reward"})} />
                                                         <span className="error">{errors.name && errors.name.message}</span>
                                              </div>
                                              <div className="reward-row">
                                                        <label htmlFor="Reward Code">Reward Code</label>
                                                        <input type="text" className="reward-control" placeholder="RMNOSJJK55" {...register("code", { required: "Please enter a reward code"})}  />
                                                        <span className="error">{errors.code && errors.code.message}</span>
                                              </div>
                                               <div className="reward-row">
                                                         <label htmlFor="description">Reward Description</label>
                                                         <input type="text" className="reward-control" placeholder="Reward description" {...register("description", { required: "Please describe your reward"})} />
                                                          <span className="error">{errors.description && errors.description.message}</span>
                                               </div>
                                          </>
                                     }
                                  
                                   <div className="reward-row">
                                          <button>{isLoading ? <Spinner3 /> : "Create Reward"}</button>
                                   </div>
                         </form>
               </div>
    </div>
  )
}

export default BrandRewardModal