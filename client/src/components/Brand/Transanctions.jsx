import { BsCalendar4 } from "react-icons/bs"
import dum1 from "../../assets/dum1.jpg"
import dum2 from "../../assets/dum2.jpg"
import dum3 from "../../assets/dum3.jpg"
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const transactions = [
    {
        id: 0,
        creator_name: 'Sharon Nyakendu',
        creator_image: dum1,
        status: 'Success',
        date: 'Nov 02, 2022',
        amount: '4,500',
    },
    {
        id: 1,
        creator_name: 'Jaber Amondi',
        creator_image: dum2,
        status: 'Pending',
        date: 'Feb 15, 2023',
        amount: '2,500'
    },
    {
        id: 2,
        creator_name: 'Abott Monde',
        creator_image: dum3,
        status: 'Failed',
        date: 'May 25, 2023',
        amount: '3,600'
    }
]
const Transanctions = () => {
  return (
    <div className="transactions-wrapper">
                 <div className="transactions-intro">
                               <h3>Transaction History</h3>
                               <div className="select-month">
                                             <span><BsCalendar4/></span>
                                           <select name="" id="">       
                                                   <option value="Month">Month</option>
                                                   { months.map(item => <option key={item}>{item}</option>)}
                                           </select>
                               </div>
                 </div>
                 <div className="transaction-table">
                              <table>
                                         <tr>
                                                 <th>Creator</th>
                                                 <th>Status</th>
                                                 <th>Date</th>
                                                 <th>Amount</th>
                                        </tr>             
                                        { transactions.map(item => 
                                                <tr key={item.id}>
                                                          <td>
                                                                 <div className="creator">
                                                                          <div className="creator-image">
                                                                                  <img src={item.creator_image} alt="" />
                                                                           </div>
                                                                            {item.creator_name}
                                                                 </div>
                                                            </td>
                                                          <td>
                                                                   <div className={
                                                                          item.status === 'Success' ? 'status success' :
                                                                          item.status === 'Pending' ? 'status pending' :
                                                                          item.status === 'Failed' ? 'status failed' :
                                                                          "status"
                                                                     }>
                                                                             <span></span>
                                                                             {item.status}
                                                                   </div>
                                                          </td>
                                                          <td>{item.date}</td>
                                                          <td>Ksh.{item.amount}</td>
                                                </tr>
                                        )}
                             </table>
                 </div>
    </div>
  )
}

export default Transanctions