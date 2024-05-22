import { useEffect, useState } from "react";
import { IoGift } from "react-icons/io5";
import BrandRewardModal from "./BrandRewardModal";
import { MobileSidebarInitiator } from "./MobileSidebarInitiator";
import { useGetAllCreatedRewardsQuery } from "../../redux/brand/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBrandRewards } from "../../redux/brand/brandUtils";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";

const BrandRewardsBody = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const { brandRewards } = useSelector(state => state.brand)
 const dispatch = useDispatch();
  const { data: rewards, isLoading } = useGetAllCreatedRewardsQuery({  refetchOnMountOrArgChange: true })
   console.log(brandRewards.rewards)
  useEffect(()=> {
          if(!isLoading && rewards){
                dispatch(setBrandRewards({...rewards}))
          }
  }, [dispatch, rewards, isLoading])

  return (
    <div className="brands-body">
               <MobileSidebarInitiator />
               <div className="rewards-header">
                          <div className="rewards-header-texts">
                                    <h2>Brand Rewards</h2>
                                    <p>Recognize your consumers for consuming your products and boost content creation.</p>
                          </div>
                          <button onClick={() => setModalStatus(true)}>Create Reward</button>
               </div>

               <div className="rewards-body">
                          { brandRewards && brandRewards.rewards.length > 0 ?
                                 brandRewards.rewards.map(item => 
                                      <div className="reward-moja" key={item._id}>
                                                <div className="reward-head">
                                                           <div className="reward-head-col">
                                                                   <span><IoGift /></span>
                                                                   <p>{item.reward_type}</p>
                                                           </div>
                                                           <div className="reward-head-col split">
                                                                      <span><CiEdit /></span>
                                                                      <span><AiOutlineDelete /></span>
                                                           </div>
                                                </div>
                                                <h3>{item.reward_name}</h3>
                                                <h2><span>Code:</span>{item.reward_code}</h2>
                                                <p>{item.reward_description}</p>
                                       </div>
                                )
                            :
                            <div className="empty-reward">
                                      <span><IoGift /></span>
                                      <p>You have not created any reward yet.</p>
                                      <button onClick={()=>setModalStatus(true) }>Create One</button>
                            </div>
                            }
                 </div>

                 { modalStatus && <BrandRewardModal  func={setModalStatus} />}
    </div>
  )
}

export default BrandRewardsBody