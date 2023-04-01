import axios from 'axios'
import React from 'react'
import useOrder from '../../Hooks/useOrder'
import {TiInputChecked} from 'react-icons/ti'


export default function AdminDash({user}) {

    const {allOrder, allCustomer} = useOrder()

async function handleDelete(id){
    await axios.delete('/deleteOrder/'+id)
    await window.location.reload()
}

const handlePaid = async (id) =>{
  const {data} = await axios.put('/updateOrder/'+id, {paid: true})
  console.log(data)
}


  return (
    <div className='admin-wrapper'>
      <h1>Welcome Admin, {user.email}</h1>
      <div className="chart">
        <h2>Number of signed in customers: {allCustomer?.length}</h2>
        <h2>Number of Orders made: {allOrder?.length}</h2>
      </div>
      <h1>Admin Order Dashboard</h1>
      <div className="dash">
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>User's Name</th>
                    <th>Address</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Delivered</th>
                </tr>
            </thead>
            {allOrder?.map((el,id)=>{
                return(
                    <tbody key={id} onDoubleClick={()=> handleDelete(el._id)}>
                        <tr>
                            <td><div className="admin-img"><img src={el.image} alt="" /></div></td>
                            <td>{el.name}</td>
                            <td>{el.address}</td>
                            <td>{el.title}</td>
                            <td>{el.quantity}</td>
                            <td>$ {el.price}</td>
                            <td><button onClick={()=> handlePaid(el._id)} className="lagBtn" >{<TiInputChecked fontSize="2rem" color={el?.paid && "green"}/> }</button></td>
                            <td>No</td>
                        </tr>
                    </tbody>
                )
            }) }
            
        </table>
      </div>
    </div>
  )
}
