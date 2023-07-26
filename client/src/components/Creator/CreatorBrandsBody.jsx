import { useSelector } from "react-redux"
import Topbar from "./Topbar"
import twiga from "../../assets/twiga.png"
import stanchart from "../../assets/stanchart.png"
import { useRequestCreationPermissionMutation } from "../../redux/usersSlice"
const CreatorBrandsBody = () => {
    const { profile } = useSelector(state => state.profile)


    const [ submitRequest ] = useRequestCreationPermissionMutation();

    const requestToWorkWithBrand = async (brandId) =>{
            try {
                    const res = await submitRequest({brandId})
                    console.log(res.data)
            } catch (error) {
                  console.log(error)
            }
    }
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

                                                 <div className="current-brands">
                                                              <div className="brand-moja">
                                                                         <div className="brand-image">
                                                                                    <img src={twiga} alt="" />
                                                                         </div>
                                                                         <h4>Twiga Foods</h4>
                                                              </div>
                                                              <div className="brand-moja">
                                                                         <div className="brand-image">
                                                                                    <img src={stanchart} alt="" />
                                                                         </div>
                                                                         <h4>Standard Chartered</h4>
                                                              </div>
                                                 </div>

                                                 <div className="available-brands">
                                                             <h3>Available Brands</h3>

                                                             <div className="available-brand-moja">
                                                                           <div className="left-items">
                                                                                          <div className="brand-profile">
                                                                                                    <img src={twiga} alt="" />
                                                                                          </div>
                                                                                          <h4>Twiga Foods</h4>
                                                                           </div>
                                                                           <div className="right-items">
                                                                                      <button onClick={() => requestToWorkWithBrand('yyyykdow')}>Request</button>
                                                                           </div>
                                                             </div>
                                                 </div>
                                      </div>
                           </div>
               </div>
    </div>
  )
}

export default CreatorBrandsBody