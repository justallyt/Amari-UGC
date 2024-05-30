import { CgClose } from "react-icons/cg"
import { useSelector } from "react-redux"
import { IoGift } from "react-icons/io5";
import { useForm } from 'react-hook-form'
import { useConfirmCreatorRewardsMutation, useGetAllCreatedRewardsQuery } from "../../redux/brand/brandSlice";
import toast from "react-hot-toast"
import Spinner3 from "../Spinner3"

const RewardChoiceModal = ({ creator, func }) => {
    const { brandRewards } = useSelector(state => state.brand);
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [ ConfirmReward, { isLoading}] = useConfirmCreatorRewardsMutation();
   const { refetch } = useGetAllCreatedRewardsQuery()
    const rewards = brandRewards.rewards !== null && brandRewards.rewards.length > 0  ?
                                               brandRewards.rewards : []

    const unassigned_rewards = rewards.filter(item => !item.beneficiaries.includes(creator._id))
  
    const rewardCreator = async(data) => {
             const formData = {
                     creator: creator._id,
                     rewards: typeof data.rewards === "string" ? [data.rewards] : data.rewards
             }
            try {
              const reward_init = await ConfirmReward(formData).unwrap();

                   if(reward_init){
                         toast.success(reward_init.message, { id: "reward_init_success"})
                         func(false)
                         refetch();
                   }
            } catch (error) {
                  toast.error("Rewarding is not possible at this time. Try again later", { id: "reward-init_error"})
                  func(false)
                  console.log(error)
            }
    }
  return (
    <div className="brand-reward-modal">
                <div className="modal-create-body">
                             <h2>Reward {creator.name}</h2>
                             <span className="close-btn" onClick={() => func(false)}><CgClose /></span> 
                             <div className="reward_form_content">
                                          { brandRewards.rewards !== null && brandRewards.rewards.length > 0 ? 
                                                      <>
                                                       <p className="para">Below is a list of all available rewards</p>
                                                              { unassigned_rewards.length > 0 ? 
                                                                    <form onSubmit={handleSubmit(rewardCreator)}>
                                                                            { unassigned_rewards.map(item => 
                                                                                  <div className="brand-reward-wrap" key={item._id}>
                                                                                             <input type="checkbox" {...register("rewards", { required: "Please choose a reward"})} value={item._id} />
                                                                                           <div  className={"reward-asset-moja" } key={item._id}>
                                                                                                   <h6><span><IoGift /></span> {item.reward_type}</h6>
                                                                                                    <div className="column-wrap">
                                                                                                               <div className="left-col">
                                                                                                                        <h5>{item.reward_name}</h5>
                                                                                                              </div>
                                                                                                              <div className="right-col">
                                                                                                                          <h4>Code: {item.reward_code}</h4>
                                                                                                              </div>
                                                                                                    </div>
                                                                                         </div>
                                                                               </div>
                                                                             )}

                                                                             <span className="error">{errors.rewards && errors.rewards.message}</span>
                                                                              <button type="submit" className="confirm-btn">{ isLoading ? <Spinner3 /> : 'Confirm'}</button>
                                                                    </form>
                                                                    :
                                                                    <p className="para">You have rewarded this creator all the rewards available</p>
                                                               }
                                                      </>
                                                 :
                                                 <h5 className="extra">Please Create a Reward to Proceed</h5>
                                           }
                             </div>
                </div>
    </div>
  )
}

export default RewardChoiceModal