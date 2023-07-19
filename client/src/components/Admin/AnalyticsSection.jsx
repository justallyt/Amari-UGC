import { GiTakeMyMoney } from "react-icons/gi"
import{HiArrowSmallDown, HiArrowSmallUp} from "react-icons/hi2"
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
//Dummy data for bar chart
const data = [
    {
        name: 'March 1 - 31',
        earnings: 25000,
        assets: 11165,
        amt: 40,
    },
    {
     name: 'April 1 - 30',
     earnings: 31500,
     assets: 14080,
     amt: 40,
   },
   {
     name: 'May 1 - 31',
     earnings: 67300,
     assets: 31800,
     amt: 29,
   },
   {
      name: 'June 1 - 30',
      earnings: 98300,
      assets: 54200,
      amt: 50
   }
]

const pie_data = [
    { name: 'New Brands', value: 100},
    { name: 'Brand Purchases', value: 450}
]
const COLORS = ['#0088FE', '#00C49F',]
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
                                                                 <option value="June 2023">June 2023</option>
                                                        </select>
                                                 </form>
                                    </div>
                                   <div className="updates-map-texts">
                                              <div className="update-map-container">
                                                       <ResponsiveContainer width="100%" height="100%">
                                                               <BarChart data={data} barGap={10} >
                                                                        <CartesianGrid vertical={false} strokeDasharray="2 2" opacity={0.4} />
                                                                                    <XAxis dataKey="name" tickLine={false} axisLine={false} label={{ fontSize:15}}  tick={{ fontSize: "12px"}} />
                                                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: "12px"}} />
                                                                                    <Tooltip shared={false} /> 
                                                                                   <Legend />
                                                                                    <Bar dataKey="assets" fill="#FFC122" opacity={0.8}  radius={[10, 10, 5, 5]} />
                                                                                    <Bar dataKey="earnings" fill="#00cde0" radius={[10, 10, 5, 5]} />
                                                                 </BarChart>
                                                       </ResponsiveContainer>
                                              </div>
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
                                                                                <span className="asset"></span>
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
                          <div className="brand-box">
                                   <div className="brand-box-content">
                                               <h3>25 New Brands</h3>
                                               <div className="percent">
                                                           <span><HiArrowSmallUp /></span>
                                                           <p className="profit">+9% from last month</p>
                                               </div>

                                               <h3>Brand Purchases</h3>
                                                <p>343 Video Assets</p>
                                                <div className="percent">
                                                            <span><HiArrowSmallDown /></span>
                                                            <p className="loss">-18% from last month</p>
                                                </div>
                                   </div>
                                   <div className="pie-chart">
                                              <ResponsiveContainer width="100%" height="100%">
                                                      <PieChart width={200} height={200}>
                                                             <Pie data={pie_data} cx={60} cy={90} innerRadius={40} outerRadius={60} fill="#8884d8" dataKey="value">
                                                                       { pie_data.map((entry, index) => (
                                                                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                                       ))}
                                                             </Pie>
                                                      </PieChart>
                                              </ResponsiveContainer>
                                   </div>
                          </div>

                          <div className="creators-box">
                                     <div className="creators-box-content">
                                                 <h3></h3>
                                     </div>
                          </div>
              </div>
    </div>
  )
}

export default AnalyticsSection