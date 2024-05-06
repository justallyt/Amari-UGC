import { useContext } from "react";
import image from "../../assets/dummyprofile.png"
import { MdLocationOn } from "react-icons/md"
import { useSelector } from "react-redux"
import { divSwitch } from "./context/divswitch";
//import { NavLink } from "react-router-dom"
const CreatorSwitches = () => {
    const { brandCreators } = useSelector(state => state.brand);
    const [ switchStatus, setSwitchStatus ] = useContext(divSwitch)

    const switchCreator = (data) => setSwitchStatus({
            status: true,
            data: data
    })
  return (
    <div className={ switchStatus.status ? "creator-switches moved" : "creator-switches" }>
              <div className="creator-tab-options">
                     <ul>
                              <li className="active">My Creators</li>
                              {/* <li>All Creators</li> */}
                     </ul>
              </div>

              <div className="creator-tabs">
                         <div className="creator-tab-my-creators">
                                      { brandCreators && brandCreators.map(kitu => 
                                          <div className="creator-moja" key={kitu._id} onClick={() => switchCreator(kitu)}>
                                                  <div className="profile-image">
                                                             <img src={kitu.profilePic.url !== null ? kitu.profilePic.url : image} alt="" />
                                                  </div>
                                                  <div className="profile-details">
                                                            <h2>{kitu.name}</h2>
                                                            <p><span><MdLocationOn /></span>{kitu.address.city !== null ? kitu.address.city : 'Null'}, {kitu.address.country !== null ? kitu.address.country : 'Null'}</p>
                                                  </div>
                                                   <div className="profile-features-row">
                                                             <div className="features">
                                                                       <div className="appreciations">
                                                                                  <h3>32.8k</h3>
                                                                                  <p>Appreciations</p>
                                                                       </div>
                                                                       <div className="brands">
                                                                                  <h3>{kitu.brands && kitu.brands.length > 0 ? kitu.brands.length : 0}</h3>
                                                                                  <p>Brands</p>
                                                                       </div>
                                                                       <div className="views">
                                                                                  <h3>443.5k</h3>
                                                                                  <p>Asset Views</p>
                                                                       </div>
                                                              </div>
                                                              {/* <div className="view-creator-profile">
                                                                       <NavLink to={'/'}>View Profile</NavLink>
                                                                 </div> */}
                                                      </div>
                                      </div>
                                      )}
                         </div>
              </div>
    </div>
  )
}

export default CreatorSwitches