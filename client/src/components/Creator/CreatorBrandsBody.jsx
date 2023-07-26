import { useSelector } from "react-redux"
import Topbar from "./Topbar"

const CreatorBrandsBody = () => {
    const { profile } = useSelector(state => state.profile)
  return (
    <div className="dashboard-body-wrap">
               <div className="dashboard-row">
                           <Topbar user={profile} />

                           <div className="brand-list-row">
                                      <div className="brand-list-header">
                                                  <h2>Brands</h2>
                                                  <p>Quickly browse through the brands you are working with. Additionally, you can also request to work with some of your favourite brands that you&apos;d like to work with.</p>
                                      </div>
                                      <div className="brand-list-body">
                                                 <h3>My Current Brands</h3>
                                      </div>
                           </div>
               </div>
    </div>
  )
}

export default CreatorBrandsBody