import { IoGift } from "react-icons/io5";
const BrandRewardsBody = () => {
  return (
    <div className="brands-body">
               <div className="rewards-header">
                          <div className="rewards-header-texts">
                                    <h2>Brand Rewards</h2>
                                    <p>Recognize your consumers for consuming your products and boost content creation.</p>
                          </div>
                          <button>Create Reward</button>
               </div>

               <div className="rewards-body">
                          <div className="empty-reward">
                                    <span><IoGift /></span>
                                    <p>You have not created any reward yet.</p>
                                    <button>Create One</button>
                          </div>
                 </div>

                 
    </div>
  )
}

export default BrandRewardsBody