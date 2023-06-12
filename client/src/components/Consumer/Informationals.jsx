import { NavLink } from "react-router-dom"
import vid1 from "../../assets/vid1.jpg"
import vid2 from "../../assets/vid2.jpg"
import vid3 from "../../assets/vid3.jpg"
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
                       </div>
              </div>
    </div>
  )
}

export default Informationals