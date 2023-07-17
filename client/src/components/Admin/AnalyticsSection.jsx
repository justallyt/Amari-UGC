import { GiTakeMyMoney } from "react-icons/gi"
const AnalyticsSection = () => {
  return (
    <div className="analytics-section">
              <div className="revenue-analytics">
                       <div className="revenue-analytics-content">
                                    <div className="analytics-header">
                                              <div className="header-texts">
                                                        <h2>Revenue Updates</h2>
                                                        <p>Overview of Profit</p>
                                              </div> 
                                              <form>
                                                        <select className="custom-select">
                                                                 <option value="March 2023">March 2023</option>
                                                                 <option value="April 2023">April 2023</option>
                                                                 <option value="May 2023">May 2023</option>
                                                        </select>
                                                 </form>
                                    </div>
                                   <div className="updates-map-texts">
                                              <div className="update-map-container"></div>
                                            <div className="time-descriptions">
                                                        <div className="money-part">
                                                                    <span><GiTakeMyMoney /></span>
                                                                    <div className="earnings">
                                                                                 <h3>Ksh.178,468</h3>
                                                                                 <p>Total Earnings</p>
                                                                    </div>
                                                        </div>
                                                        <div className="map-description">
                                                                     <div className="assets-count">
                                                                                <span></span>
                                                                                <div className="asset-number">
                                                                                           <h4>Earnings this month</h4>
                                                                                           <h2>Ksh. 65,789</h2>
                                                                                </div>
                                                                     </div>
                                                                     <div className="assets-count">
                                                                                <span></span>
                                                                                <div className="asset-number">
                                                                                           <h4>Assets Bought this month</h4>
                                                                                           <h2>356</h2>
                                                                                </div>
                                                                     </div>

                                                                     <div className="report-btn">
                                                                               <button>View Full Report</button>
                                                                     </div>
                                                        </div>
                                              </div>
                                   </div>
                                   
                       </div>
              </div>
              <div className="date-analytics">

              </div>
    </div>
  )
}

export default AnalyticsSection