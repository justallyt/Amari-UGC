import { CgMoreAlt } from "react-icons/cg"
import brands from "../../assets/enterprise.png"
import videos from "../../assets/video-editing.png"
import { AreaChart, Area, XAxis, YAxis,  Tooltip, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";

const data = [
     { name: 'Jan', uv: 120, pv: 400, amt: 2000},
     { name: 'Feb', uv:310, pv: 400, amt: 2000},
     { name: 'March', uv: 179, pv: 400, amt: 2000},
     { name: 'April', uv: 280, pv: 400, amt: 2000},
     { name: 'May', uv: 60, pv: 400, amt: 2000},
     { name: 'June', uv: 280, pv: 400, amt: 2000},
     { name: 'July', uv: 148, pv: 400, amt: 2000},
     { name: 'August', uv: 250, pv: 400, amt: 2000}
]



const Extras = () => {
  const { assets } = useSelector(state => state.utils)
  //Sanitize things
const active_brands = assets && [...new Set(assets.map(item => item.created_for))]

  return (
    <div className="extras-section">
             <div className="extras-wrapper">
                        <div className="extra-box">
                                     <div className="extra-header">
                                            <h3>Earnings</h3>
                                            <span><CgMoreAlt /></span>
                                     </div>
                                   <h1>Ksh. 84,690.50</h1>
                                   <p><span>+10%</span> since last month</p>
                        </div>

                        <div className="summary-row">
                                     <div className="brands-box">
                                                 <div className="brand-icon">
                                                           <img src={brands} alt="" />
                                                 </div>
                                                <h4>{active_brands !== null ? active_brands.length : '0'} Brands</h4>
                                                <p>Created for</p>
                                     </div>
                                     <div className="brands-box">
                                                 <div className="brand-icon">
                                                           <img src={videos} alt="" />
                                                 </div>
                                                <h4>{assets !== null ? assets.length : 0} Assets</h4>
                                                <p>Created</p>
                                     </div>
                        </div>

                        <div className="simple-chart">
                                  <h2>Audience Overview</h2>
                                  <p>Business graph with Stats</p>

                                  <div className="chart">
                                            <ResponsiveContainer width='99%' height='100%'>
                                                     <AreaChart  width={300} height={100} data={data} margin={{ left: -60}}>
                                                              <defs>
                                                                       <linearGradient id="color" x1='0' y1='0' x2='0' y2='1'>
                                                                                  <stop offset='0%' stopColor="#00c7e1" stopOpacity={0.7} />
                                                                                  <stop offset="90%" stopColor="#fff" stopOpacity={0.05} />
                                                                       </linearGradient>
                                                              </defs>
                                                               <XAxis dataKey='name' tick={false}  axisLine={false} />
                                                               <YAxis tick={false} axisLine={false} />
                                                               <Tooltip />
                                                               <Area type='monotone' dataKey='uv' stroke="#00c7e1" strokeWidth={2} fill="url(#color)" />
                                                      </AreaChart>
                                            </ResponsiveContainer>

                                            <div className="stats">
                                                      <h3>2K Reactions</h3>
                                                      <h3>100+ Views</h3>
                                            </div>
                                  </div>
                        </div>
             </div>
    </div>
  )
}

export default Extras