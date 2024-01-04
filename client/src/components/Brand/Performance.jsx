import { RxTriangleUp } from "react-icons/rx"
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//Dummy data for bar chart
const data = [
    {
        name: 'July 1 - 31',
        posts: 25,
        videos: 10,
        amt: 40,
    },
    {
     name: 'Aug 1 - 31',
     posts: 30,
     videos: 58,
     amt: 40,
   },
   {
     name: 'Sep 1 - 30',
     posts: 20,
     videos: 38,
     amt: 29,
   },
]
const Performance = () => {
  return (
    <div className="performance-analytics">
    <h3>Performance</h3>
    <div className="performance-grid-wrap">
                <div className="performance-numbers">
                            <div className="performance-numbers-inner">
                                      <h4>Total Impressions</h4>
                                       <p>Last 90 days</p>

                                       <h1>100k <span><RxTriangleUp className="icon" />+ 5.4%</span></h1>
                                      <p><span>+ 9.3k </span>vs prev 60 days</p>
                            </div>
                </div>
                <div className="performance-bar-chart">
                        <h5>Analytics <span>+ 5.4%</span></h5>
                        <div className="performance-bar-chart-inner">
                            <ResponsiveContainer width="99%" height="100%">
                                <BarChart data={data} barGap={10} >
                                         <CartesianGrid vertical={false} strokeDasharray="2 2" opacity={0.4} />
                                                     <XAxis dataKey="name" tickLine={false} axisLine={false} label={{ fontSize:15}}  tick={{ fontSize: "12px"}} />
                                                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: "12px"}} />
                                                     <Tooltip shared={false} /> 
                                                    <Legend />
                                                     <Bar dataKey="videos" fill="#6d4ae2" opacity={0.6} radius={[10, 10, 5, 5]} />
                                                     <Bar dataKey="posts" fill="#00cde0" radius={[10, 10, 5, 5]} />
                                  </BarChart>
                               </ResponsiveContainer>
                        </div>
                </div>
    </div>
</div>
  )
}

export default Performance