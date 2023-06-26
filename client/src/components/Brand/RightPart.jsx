import { BsBell, BsSearch } from "react-icons/bs"
import twiga from "../../assets/twiga.png"
import { useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"
import creator1 from "../../assets/creator1.jpg"
import creator2 from "../../assets/creator2.jpg"
import creator3 from "../../assets/creator3.jpg"
import creator4 from "../../assets/creator4.jpg"
import creator5 from "../../assets/creator5.jpg"
const RightPart = () => {
    const { profile } = useSelector(state => state.profile)
    const creators = [creator1, creator2, creator3, creator4, creator5]
  return (
    <div className="right-part-wrapper">
              <div className="right-part-inner">
                        <div className="right-part-header">
                                    <div className="bell-part">
                                               <span><BsBell />  <span className="dot"></span></span>    
                                    </div>
                                    <div className="search-area">
                                               <input type="text" className="search-control" />
                                               <span><BsSearch /></span>
                                    </div>
                        </div>

                        <div className="brand-profile-view">
                                   <div className="logo-section">
                                              <img src={twiga} alt="" />
                                   </div>
                                   <h3>{profile.name}</h3>
                                   <h5>{profile.email}</h5>
                                  <div className="biz">
                                              <p>{profile.businessType}</p>
                                  </div>

                                  <div className="profile-links">
                                             <NavLink to={'/'}>User Profile</NavLink>
                                             <NavLink to={'/'}>Notifications</NavLink>
                                  </div>
                        </div>

                        <div className="creators-loft">
                                   <h3>My Star Creators</h3>
                                    <div className="creator-images">
                                               { creators.map(item => 
                                                      <div className="creator-image" key={item}>
                                                                 <img src={item} alt="" />
                                                      </div>
                                                )}
                                    </div>
                        </div>
              </div>
    </div>
  )
}

export default RightPart