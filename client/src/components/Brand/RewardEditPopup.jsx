import {CgClose} from "react-icons/cg"
import { useForm } from 'react-hook-form'
import { useEditBrandRewardMutation } from "../../redux/brand/brandSlice";
import toast, { Toaster } from "react-hot-toast"
import Spinner3 from "../Spinner3"
import { useSelector } from "react-redux";

const RewardEditPopup = ({ id, func}) => {
    const {brandRewards } = useSelector(state => state.brand);
    const activeReward = brandRewards !==null && brandRewards.rewards.find(item => item._id === id)
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
           defaultValues: {
                   type: activeReward.reward_type,
                   name: activeReward.reward_name,
                   code: activeReward.reward_code,
                   description: activeReward.reward_description
           }
    }); 
    const [ UpdateReward , { isLoading }] = useEditBrandRewardMutation();
    
     const submit = async(data) => {
          const formData = {
                  id: id,
                  data: data
          }
           try {
                 const res = await UpdateReward(formData).unwrap();
   
                 if(res){
                       func(false)
                       reset();
                       toast.success(res.message, { id: 'edit-reward-success'})
                 }
           } catch (error) {
                 toast.error("An error has occured", { id: 'reward-error'})
           }
     }
  return (
    <div className='brand-reward-modal'>
                <Toaster />
                <div className="modal-create-body">
                           <h3>Edit this Reward</h3>
                           <span className="close-btn" onClick={() => func(false)}><CgClose /></span>
                           <form onSubmit={handleSubmit(submit)}>
                                   <div className="reward-row">
                                             <label htmlFor="Reward Type">Reward Type</label>
                                              <select className="reward-control" {...register("type", { required: "Please choose reward type"})}>
                                                         <option value="">Set Reward Type</option>
                                                         <option value="Coupon">Coupon</option>
                                              </select>
                                              <span className="error">{errors.type && errors.type.message} </span>
                                   </div>
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
                                   <div className="reward-row">
                                          <button>{isLoading ? <Spinner3 /> : "Edit Reward"}</button>
                                   </div>
                         </form>
                </div>
    </div>
  )
}

export default RewardEditPopup