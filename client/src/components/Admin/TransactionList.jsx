import dum1 from "../../assets/dum1.jpg"
import dum2 from "../../assets/dum2.jpg"
import dum3 from "../../assets/dum3.jpg"
const TransactionList = () => {
    const transactions = [
        {
            id: 0,
            user: 'Sharon Nyakendu',
            image: dum1,
            transaction_type: 'Brand Purchase',
            status: 'Success',
            date: 'Nov 02, 2022',
            amount: '4,500',
        },
        {
            id: 1,
            user: 'Jaber Amondi',
            image: dum2,
            transaction_type: 'Creator Payment',
            status: 'Pending',
            date: 'Feb 15, 2023',
            amount: '2,500'
        },
        {
            id: 2,
            user: 'Abott Monde',
            image: dum3,
            transaction_type: 'Brand Purchase',
            status: 'Failed',
            date: 'May 25, 2023',
            amount: '3,600'
        },
        {
            id: 3,
            user: 'Cindy Nyabala',
            image: dum1,
            transaction_type: 'Creator Payment',
            status: 'Success',
            date: 'Nov 02, 2022',
            amount: '4,500',
        },
    ]
  return (
    <div className="transaction-list-section">
               <h2>Recent Transactions</h2>
               <div className="transaction-table">
                              <table>
                                         <thead>
                                            <tr>
                                                 <th>User</th>
                                                 <th>Status</th>
                                                 <th>Transaction Type</th>
                                                 <th>Date</th>
                                                 <th>Amount</th>
                                            </tr>         
                                        </thead>        
                                        <tbody>
                                             { transactions.map(item => 
                                                <tr key={item.id}>
                                                          <td>
                                                                 <div className="creator">
                                                                          <div className="creator-image">
                                                                                  <img src={item.image} alt="" />
                                                                           </div>
                                                                            {item.user}
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
                                                          <td>
                                                                    <div className="small-push">
                                                                             {item.transaction_type}
                                                                    </div>
                                                          </td>
                                                          <td>{item.date}</td>
                                                          <td>Ksh.{item.amount}</td>
                                                </tr>
                                            )}
                                        </tbody>
                             </table>
               </div>
    </div>
  )
}

export default TransactionList