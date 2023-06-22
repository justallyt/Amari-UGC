import { NavLink } from "react-router-dom"
import vid1 from "../../assets/vid1.jpg"
import vid2 from "../../assets/vid2.jpg"
import vid3 from "../../assets/vid3.jpg"
import standard from "../../assets/standard.png"
import { MdOutlineVideoFile } from "react-icons/md"
const Informationals = () => {
  const creations = [
        {
              id: 0,
              image: vid1,
              txt: "Fenti",
              category: 'Beauty'
        },
        {
            id: 1,
            image: vid2,
            txt: "Wakili Box",
            category: 'Corporate'
      },
      {
        id: 2,
        image: vid3,
        txt: "Orchard Juice",
        category: 'Food & Beverage'
  }
  ]
  return (
    <div className="informationals-section">
              <div className="section-wrapper">
                       <div className="informationals-creations">
                                <div className="creation-header">
                                            <h2>Recently Added Creations</h2>
                                            <NavLink to={'/'}>Create New <span><MdOutlineVideoFile /></span></NavLink>
                                </div>

                                <div className="creations-row">
                                        { creations.map(item => 
                                              <div className="creation-moja" key={item.id}>
                                                        <div className="creation-thumbnail">
                                                                 <img src={item.image} alt="" />
                                                        </div>
                                                        <h3>{item.txt}</h3>
                                                        <p>{item.category}</p>
                                            </div>
                                        )}
                                </div>

                                <div className="activity-panel">
                                            <h2>History</h2>

                                            <div className="panel-switch-tabs">
                                                        <div className="switch">
                                                                    <h3>Activity</h3>
                                                        </div>
                                            </div>

                                            <div className="tab-row">
                                                     <h4>Today</h4>

                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={vid1} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>You</h5>
                                                                                    <p>You uploaded a new video.</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>1 min ago</p>
                                                                 </div>
                                                     </div>
                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={standard} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>Standard Chartered</h5>
                                                                                    <p>Standard Chartered liked your post</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>10 mins ago</p>
                                                                 </div>
                                                     </div>

                                                     <h4>Yesterday</h4>

                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={vid2} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>You</h5>
                                                                                    <p>You post a new video</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>Yesterday</p>
                                                                 </div>
                                                     </div>
                                                     <div className="activity-moja">
                                                                <div className="activity-block">
                                                                         <div className="activity-thumbnail">
                                                                                     <img src={vid3} alt="" />
                                                                         </div>
                                                                         <div className="activity-user">
                                                                                    <h5>Orchard Juice</h5>
                                                                                    <p>Orchard Juice liked your video</p>
                                                                         </div>
                                                                </div>
                                                                <div className="time"> 
                                                                        <p>Yesterday</p>
                                                                 </div>
                                                     </div>
                                            </div>
                                </div>
                       </div>
              </div>
    </div>
  )
}

export default Informationals