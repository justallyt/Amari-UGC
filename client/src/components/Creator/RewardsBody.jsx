import { useDispatch, useSelector } from "react-redux"
import Topbar from "./Topbar"
import { IoIosTimer } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { BsDashLg } from "react-icons/bs";
import { useGetAllUserRewardsQuery } from "../../redux/usersSlice";
import { useEffect } from "react";
import { setProfileRewards } from "../../redux/profileSlice";
import SpinnerData from "../SpinnerData";
import { calculateTimePassed } from "../../utils/dateConverter";

const RewardsBody = () => {
    const { profile, my_rewards } = useSelector(state => state.profile)
    const { userBrands } = useSelector(state => state.utils)
    const dispatch = useDispatch();
    const { data, isLoading } = useGetAllUserRewardsQuery();

    useEffect(() => {
             if(data){
                   dispatch(setProfileRewards([...data.result]))
             }
    }, [data, dispatch])

    const getBrandDetails = (id) => {
          const brand = userBrands.filter(item => item._id === id);
          return { image: brand[0].profilePic.url, name: brand[0].name}
    }

  return (
    <div className="dashboard-body-wrap">
            <div className="dashboard-row">
                     <Topbar user={profile} />

                     <div className="rewards-body-wrap">
                                <div className="rewards-body-header">
                                           <h2>My Rewards</h2>
                                           <p>Your dedication is appreciated!  Explore the valuable rewards awaiting you in recognition of your exceptional work crafting impactful brand moments.</p>
                                </div>
                                { isLoading ? 
                                        <div className="spinner-bar">
                                                 <SpinnerData />
                                        </div> : 
                                      <>
                                            { my_rewards && my_rewards.length > 0 ? 
                                    <div className="rewards-body-table">
                                           <table>
                                                     <thead>
                                                                 <tr>
                                                                           <th>Rewarder</th>
                                                                           <th>Type</th>
                                                                           <th>Name</th>
                                                                           <th>Code</th>
                                                                           <th>Description</th>
                                                                           <th>Action</th>
                                                                 </tr>
                                                     </thead>
                                                     <tbody>
                                                            { my_rewards.map(item => 
                                                                <tr key={item._id}>
                                                                              <td>
                                                                                      
                                                                                        <div className="brand">
                                                                                                  <img src={getBrandDetails(item.reward_owner).image} alt="" />
                                                                                                  <div className="brand-texts">
                                                                                                            <h4>{ getBrandDetails(item.reward_owner).name}</h4>
                                                                                                            <p><span><IoIosTimer /></span>{calculateTimePassed(item.updatedAt)}</p>
                                                                                                  </div>
                                                                                         </div>
                                                                              </td>
                                                                              <td className={item.reward_type == "Coupon" ? "coupon" : "custom-coupon"}> <span>{item.reward_type}</span></td>
                                                                              <td className="name-column">{item.reward_name}</td>
                                                                              <td className="code">{item.reward_code == "" ? <span><BsDashLg /></span> : item.reward_code }</td>
                                                                              <td className="description">
                                                                                      <p>{item.reward_description}</p>
                                                                              </td>
                                                                              <td className="final"><span><IoTicketOutline /></span></td>
                                                                   </tr>
                                                            )}
                                                   
                                                               {/* <tr>
                                                                          <td>
                                                                                    <div className="brand">
                                                                                              <img src={profilePic} alt="" />
                                                                                              <div className="brand-texts">
                                                                                                        <h4>Cera Ve</h4>
                                                                                                        <p><span><IoIosTimer /></span>4 days ago</p>
                                                                                              </div>
                                                                                    </div>
                                                                          </td>
                                                                          <td className="custom-coupon"> <span>Custom</span></td>
                                                                          <td className="name-column">Remix Deluxe Offer</td>
                                                                          <td className="code"><span><BsDashLg /></span></td>
                                                                          <td className="description">
                                                                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam blanditiis quisquam laudantium vitae quibusdam possimus eveniet non a ducimus quos.</p>
                                                                          </td>
                                                                          <td className="final"><span><IoTicketOutline /></span></td>
                                                               </tr> */}
                                                     </tbody>
                                           </table>
                                </div>
                                              : 
                                              <p className="reward-error">You have not been rewarded. Continue creating content for more reach.</p>
                                            }
                                      </>
                                }

                     </div>
            </div>
    </div>
  )
}

export default RewardsBody