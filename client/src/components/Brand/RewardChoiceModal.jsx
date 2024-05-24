import { CgClose } from "react-icons/cg"
import { useSelector } from "react-redux"
import { IoGift } from "react-icons/io5";
const RewardChoiceModal = ({ creator, func }) => {
    const { brandRewards } = useSelector(state => state.brand);

  return (
    <div className="brand-reward-modal">
                <div className="modal-create-body">
                             <h2>Reward {creator.name}</h2>
                             <span className="close-btn" onClick={() => func(false)}><CgClose /></span>
                             <p className="para">Below is a list of all available rewards</p>

                             { brandRewards.rewards !== null && brandRewards.rewards.length > 0 ?
                                         brandRewards.rewards.map(item => 
                                            <div className="reward-asset-moja" key={item._id}>
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
                                        )
                               :
                                     <h5>Please Create a Reward to Proceed</h5>
                               }
                </div>
    </div>
  )
}

export default RewardChoiceModal